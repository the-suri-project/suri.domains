import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import messages from 'src/i18n';

const LOCALE_KEY = 'locale';
const MOBILE_TABLET_THRESHOLD = 960;
const TABLET_DESKTOP_THRESHOLD = 1280;

export const useGlobalStore = defineStore('global', {
    state: () => ({
        // The preferred language.
        locale: useStorage(LOCALE_KEY, getDefaultLocale()),

        // The current window size.
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
    }),
    getters: {
        isMobile: (state) => state.windowWidth < MOBILE_TABLET_THRESHOLD,
        isTablet: (state) =>
            state.windowWidth >= MOBILE_TABLET_THRESHOLD &&
            state.windowWidth < TABLET_DESKTOP_THRESHOLD,
        isDesktop: (state) => state.windowWidth >= TABLET_DESKTOP_THRESHOLD,
    },
    actions: {
        clearState() {
            // Ignore
        },
    },
});

function getDefaultLocale() {
    const locale = navigator.language.split('-')[0] || 'en';

    if (messages[locale]) {
        return locale;
    }

    return 'en';
}
