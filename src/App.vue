<script setup lang="ts">
import {useI18n} from 'vue-i18n';
import {useGlobalStore} from 'stores/global';
import {onBeforeMount, watch} from 'vue';

const {locale} = useI18n({
    useScope: 'global',
});
const globalStore = useGlobalStore();

// REFS -----------------------------------------------------------------------
// COMPUTED -------------------------------------------------------------------
// METHODS --------------------------------------------------------------------
// WATCHES --------------------------------------------------------------------
watch(locale, () => {
    globalStore.locale = locale.value as string;
});

// HOOKS ----------------------------------------------------------------------
onBeforeMount(() => {
    locale.value = globalStore.locale;
});
</script>

<template>
    <router-view/>
</template>
