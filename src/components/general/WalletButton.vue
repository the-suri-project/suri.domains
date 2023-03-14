<script lang="ts" setup>
import {computed, ref} from 'vue';
import {PublicKey} from '@solana/web3.js';
import {shortenAddress} from 'src/utils/solana';
import {sleep} from 'src/utils/time';
import {useI18n} from 'vue-i18n';
import {useWallet, Wallet} from 'src/lib/WalletAdapter';
import {apiGetAuthChallenge, apiVerifyAuthChallenge} from 'src/api/auth';
import {useGlobalStore} from 'stores/global';
import {mapLocaleToLanguageRequest} from 'src/api/requests/auth';
import {getErrorResponseMessage, isErrorResponse} from 'src/api/responses/error';
import {useQuasar} from 'quasar';
import base58 from 'bs58';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
    mobile?: boolean
}>();

const {t} = useI18n();
const wallet = useWallet();
const quasar = useQuasar();
const globalStore = useGlobalStore();

// REFS -----------------------------------------------------------------------
const showMenu = ref(false);

// COMPUTED -------------------------------------------------------------------
const shortAddress = computed(() => shortenAddress(wallet.publicKey.value ?? PublicKey.default));
const installedWallets = computed(() => wallet.wallets.value.filter((w) => w.readyState === 'Installed'));
const otherWallets = computed(() => wallet.wallets.value.filter((w) => w.readyState !== 'Installed'));

// METHODS --------------------------------------------------------------------
async function connect(selectedWallet: Wallet) {
    showMenu.value = false;

    if (selectedWallet.readyState !== 'Installed') {
        window.open(selectedWallet.url, '_blank');
        return;
    }

    try {
        wallet.select(selectedWallet.name);
        await sleep(100);
        await wallet.connect();
    } catch (e) {
        console.error('Failed to connect the wallet', e);
        return;
    }

    login();
}

async function login() {
    globalStore.authenticating = true;

    let nonce = '';
    try {
        let response = await apiGetAuthChallenge({
            wallet: wallet.publicKey.value!.toBase58(),
            language: mapLocaleToLanguageRequest(globalStore.locale),
        });

        nonce = response.nonce;
    } catch (e) {
        console.error('Couldn\'t get auth challenge', e);

        let message: string;
        if (isErrorResponse(e)) {
            message = getErrorResponseMessage(e);
        } else {
            message = t('errors.networkError');
        }

        quasar.notify({
            type: 'negative',
            message,
        });

        globalStore.authenticating = false;
        return;
    }

    let signature = '';
    try {
        let messageBytes = new TextEncoder().encode(nonce);
        let signatureBytes = await wallet.signMessage.value!(messageBytes);
        signature = base58.encode(signatureBytes);
    } catch (e) {
        console.error('Rejected auth signature', e);

        globalStore.authenticating = false;
        return;
    }

    try {
        let response = await apiVerifyAuthChallenge({
            wallet: wallet.publicKey.value!.toBase58(),
            signature,
        });

        globalStore.jwtToken = response.jwtToken;
        globalStore.freeMonths = response.freeMonths;
        globalStore.paymentPercentage = response.paymentPercentage;
        globalStore.freeSurisInBulk = response.freeSurisInBulk;
        globalStore.email = response.email;
    } catch (e) {
        console.error('Couldn\'t verify auth challenge', e);

        let message: string;
        if (isErrorResponse(e)) {
            message = getErrorResponseMessage(e);
        } else {
            message = t('errors.networkError');
        }

        quasar.notify({
            type: 'negative',
            message,
        });
    }

    globalStore.authenticating = false;
}

async function cancelConnecting() {
    wallet.connecting.value = false;
}

async function disconnect() {
    try {
        await wallet.disconnect();
    } catch (e) {
        console.error('Failed to disconnect the wallet', e);
    }
}

// WATCHES --------------------------------------------------------------------
// HOOKS ----------------------------------------------------------------------
</script>

<template>
    <q-btn class="wallet-button gradient-button button-width relative-position"
           :class="{'mobile-version': mobile}"
           color="white"
           no-caps
           flat
           dense>
        <template v-if="wallet.connected.value">
            <img :src="wallet.wallet.value.icon" class="icon-image" :alt="wallet.wallet.value.name"/>
            <span class="q-ml-sm" v-if="!mobile">{{ shortAddress }}</span>
            <q-icon name="fa-solid fa-cloud" class="q-ml-sm" v-if="globalStore.isLoggedIn" size="14px"/>
        </template>
        <template v-else-if="wallet.connecting.value">
            <q-spinner size="16px"/>
            <span class="q-ml-sm" v-if="!mobile">{{ t('connectingWalletButton') }}</span>
        </template>
        <template v-else>
            <q-icon name="fa-solid fa-wallet" size="16px"/>
            <span class="q-ml-sm" v-if="!mobile">{{ t('connectWalletButton') }}</span>
        </template>

        <q-menu v-model="showMenu" fit anchor="bottom right" self="top right">
            <q-card class="menu-card">
                <q-list>
                    <q-separator/>
                    <q-item clickable v-close-popup @click="cancelConnecting" v-if="wallet.connecting.value">
                        <q-item-section class="text-center text-bold">{{
                                t('cancelButton')
                            }}
                        </q-item-section>
                    </q-item>
                    <template v-else-if="wallet.connected.value">
                        <q-item clickable v-close-popup @click="disconnect">
                            <q-item-section class="text-center text-bold">{{
                                    t('disconnectButton')
                                }}
                            </q-item-section>
                        </q-item>
                    </template>

                    <template v-else-if="!wallet.connecting.value">
                        <template v-if="installedWallets.length > 0">
                            <q-item-label header class="q-py-sm q-px-md text-secondary text-caption text-bold">{{
                                    t('availableTitle')
                                }}:
                            </q-item-label>
                            <q-item v-for="w in installedWallets"
                                    :key="w.name"
                                    clickable
                                    v-close-popup
                                    @click="connect(w)">
                                <q-item-section avatar>
                                    <q-img :src="w.icon" height="20px" width="20px"/>
                                </q-item-section>
                                <q-item-section> {{ w.name }}</q-item-section>
                                <q-item-section side v-if="w.readyState !== 'Installed'">
                                    <q-icon name="fa-solid fa-arrow-up-right-from-square"
                                            size="10px"
                                            class="q-ml-xs"
                                            color="grey-4"/>
                                </q-item-section>
                            </q-item>
                        </template>

                        <template v-if="otherWallets.length > 0">
                            <q-item-label header class="q-py-sm q-px-md text-secondary text-caption text-bold">{{
                                    t('notInstalledTitle')
                                }}:
                            </q-item-label>
                            <q-item v-for="w in otherWallets" :key="w.name" clickable v-close-popup @click="connect(w)">
                                <q-item-section avatar>
                                    <q-img :src="w.icon" :alt="w.name" height="20px" width="20px"/>
                                </q-item-section>
                                <q-item-section> {{ w.name }}</q-item-section>
                            </q-item>
                        </template>
                    </template>
                </q-list>
            </q-card>
        </q-menu>
    </q-btn>
</template>

<style lang="scss" scoped>
.wallet-button {
    &.mobile-version {
        min-width: unset;
        padding-left: 10px;
        padding-right: 10px;
    }
}

.button-width {
    min-width: 152px;
    padding-left: 20px;
    padding-right: 20px;
}

.dialog-card {
    min-width: 300px;
    max-width: 100vw;

    h5 {
        font-size: 30px;
    }
}

.icon-image {
    height: 16px;
    width: 16px;
}

.q-list:deep(.q-item__section--avatar) {
    min-width: unset;
    padding-right: 12px;
}
</style>

<i18n lang="yaml">
en:
    connectWalletButton: Connect Wallet
    connectingWalletButton: Connecting...
    cancelButton: Cancel
    disconnectButton: Disconnect
    availableTitle: Available
    notInstalledTitle: Not installed
es:
    connectWalletButton: Conectar wallet
    connectingWalletButton: Conectando...
    cancelButton: Cancelar
    disconnectButton: Desconectar
    availableTitle: Disponibles
    notInstalledTitle: No instalados
</i18n>
