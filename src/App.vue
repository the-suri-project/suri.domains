<script setup lang="ts">
import {useI18n} from 'vue-i18n';
import {useGlobalStore} from 'stores/global';
import {onBeforeMount, watch} from 'vue';
import {useWallet} from 'src/lib/WalletAdapter';
import {useTokenStore} from 'stores/tokens';

const {locale} = useI18n({
    useScope: 'global',
});
const wallet = useWallet();
const globalStore = useGlobalStore();
const tokenStore = useTokenStore();

// REFS -----------------------------------------------------------------------
// COMPUTED -------------------------------------------------------------------
// METHODS --------------------------------------------------------------------
// WATCHES --------------------------------------------------------------------
watch(locale, () => {
    globalStore.locale = locale.value as string;
});

watch(wallet.connected, (connected) => {
    if (!connected) {
        globalStore.clearState();
        tokenStore.clearState();
    }
});

watch(wallet.publicKey, (publicKey) => {
    if (publicKey) {
        tokenStore.fetchTokens(publicKey);
    }
});

// HOOKS ----------------------------------------------------------------------
onBeforeMount(() => {
    locale.value = globalStore.locale;
});
</script>

<template>
    <router-view/>
</template>
