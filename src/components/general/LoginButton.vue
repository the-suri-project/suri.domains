<script lang="ts" setup>
import {useI18n} from 'vue-i18n';
import {useWallet} from 'src/lib/WalletAdapter';
import {apiGetAuthChallenge, apiVerifyAuthChallenge} from 'src/api/auth';
import {useGlobalStore} from 'stores/global';
import {mapLocaleToLanguageRequest} from 'src/api/requests/auth';
import {getErrorResponseMessage, isErrorResponse} from 'src/api/responses/error';
import {useQuasar} from 'quasar';
import base58 from 'bs58';

defineProps<{
    mobile?: boolean
}>();

const {t} = useI18n();
const wallet = useWallet();
const quasar = useQuasar();
const globalStore = useGlobalStore();

// REFS -----------------------------------------------------------------------
// COMPUTED -------------------------------------------------------------------
// METHODS --------------------------------------------------------------------
async function login() {
    if (globalStore.authenticating) {
        return;
    }

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

// WATCHES --------------------------------------------------------------------
// HOOKS ----------------------------------------------------------------------
</script>

<template>
    <q-btn class="login-button gradient-button button-width relative-position"
           :class="{'mobile-version': mobile}"
           color="white"
           no-caps
           flat
           dense
           v-if="wallet.connected.value && !globalStore.isLoggedIn"
           @click="login">
        <template v-if="!globalStore.authenticating">
            <q-icon name="fa-solid fa-cloud" size="14px"/>
            <span class="q-ml-sm" v-if="!mobile">{{ t('login') }}</span>
        </template>
        <template v-else>
            <q-spinner size="16px"/>
            <span class="q-ml-sm" v-if="!mobile">{{ t('connecting') }}</span>
        </template>
    </q-btn>
</template>

<style lang="scss" scoped>
.login-button {
    &.mobile-version {
        min-width: unset;
        padding-left: 10px;
        padding-right: 10px;
    }
}

.button-width {
    padding-left: 20px;
    padding-right: 20px;
}
</style>

<i18n lang="yaml">
en:
    login: Login
    connecting: Connecting...
es:
    login: Autenticarse
    connecting: Conectando...
</i18n>
