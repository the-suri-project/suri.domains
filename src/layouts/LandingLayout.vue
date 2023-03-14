<script setup lang="ts">
import {useI18n} from 'vue-i18n';
import {useRouter} from 'vue-router';
import {computed, nextTick, onMounted, ref, watch} from 'vue';
import {useGlobalStore} from 'stores/global';
import {DISCORD_URL, TWITTER_URL} from 'app/constants';
import {initParticles} from 'boot/particles';
import {QScrollArea} from 'quasar';
import {useTitle} from '@vueuse/core';

const {
    t,
    locale,
} = useI18n();
const {locale: globalLocale} = useI18n({
    useScope: 'global',
});
const globalStore = useGlobalStore();
const router = useRouter();
const title = useTitle();

// REFS -----------------------------------------------------------------------
const drawerOpen = ref(false);
const scrollAreaEl = ref<QScrollArea>();

// COMPUTED -------------------------------------------------------------------
const selectedLocale = computed(() => {
    return (globalLocale.value as string).split('-')[0];
});

// METHODS --------------------------------------------------------------------
function goTo(name: string) {
    router.push({name});
}

function goToDocs() {
    window.open('https://docs.suri.domains', '_blank');
}

function goToTwitter() {
    window.open(TWITTER_URL, '_blank');
}

function goToDiscord() {
    window.open(DISCORD_URL, '_blank');
}

function changeLocale(key: string, moveToBottom = false) {
    globalLocale.value = key;

    if (moveToBottom) {
        nextTick(() => {
            scrollAreaEl.value!.setScrollPosition('vertical', 99999);
        });
    }
}

function handlePageStyle(offset: number, pageHeight: number) {
    return {
        height: 0,
        minHeight: `${pageHeight}px`,
        '--page-height': `${pageHeight}px`,
        '--header-height': `${offset}px`,
    };
}

// WATCHES --------------------------------------------------------------------
watch(() => globalStore.isMobile, (isMobile) => {
    if (!isMobile) {
        drawerOpen.value = false;
    }
});

watch(drawerOpen, (drawerOpen) => {
    if (drawerOpen) {
        nextTick(() => initParticles('particles-js2'));
    }
});

watch(locale, () => {
    title.value = t('pageTitle');
}, {immediate: true});

// HOOKS ----------------------------------------------------------------------
onMounted(() => {
    initParticles('particles-js');
});
</script>

<template>
    <q-layout view="lHH Lpr lff" :class="{ 'suri-mobile': globalStore.isMobile }">
        <q-header :class="{ 'drawer-open': drawerOpen }">
            <div class="max-page-width">
                <q-toolbar>
                    <q-toolbar-title class="flex items-center q-ml-md">
                        <img src="~assets/landing/header-logo.png"
                             :alt="t('logoAlt')"
                             @click="goTo('Home')"
                             class="logo cursor-pointer"/>
                    </q-toolbar-title>

                    <template v-if="!globalStore.isMobile">
                        <div class="menu-buttons row">
                            <div class="menu-button link-button" @click="goToDocs">
                                {{ t('docsButton') }}
                            </div>
                        </div>
                        <q-separator vertical class="q-mx-md q-my-lg"/>
                        <div class="social-button link-button q-mr-lg" @click="goToDiscord">
                            <q-icon name="fa-brands fa-discord"/>
                        </div>
                        <div class="social-button link-button q-mr-md" @click="goToTwitter">
                            <q-icon name="fa-brands fa-twitter"/>
                        </div>
                    </template>
                    <template v-else>
                        <div class="menu-buttons row">
                            <q-btn class="gradient-button q-px-md" flat dense no-caps @click="goTo('Bookings')">
                                {{ t('appButton') }}
                            </q-btn>
                        </div>
                        <q-btn flat
                               round
                               dense
                               icon="menu"
                               color="primary"
                               @click="drawerOpen = true"
                               v-show="!drawerOpen"/>
                        <q-btn flat round dense icon="close" @click="drawerOpen = false" v-show="drawerOpen"/>
                    </template>
                </q-toolbar>
            </div>
            <div class="header-border bg-gradient-theme-to-right"></div>
        </q-header>

        <div v-if="drawerOpen" class="mobile-menu bg-gradient-background flex justify-center">
            <div class="absolute-full mobile-menu-stars-bg">
                <div id="particles-js2" class="absolute-full"></div>
            </div>
            <div class="container q-pt-xl relative-position">
                <div class="menu-button link-button" @click="goToDocs">
                    {{ t('docsButton') }}
                </div>
                <div class="menu-button q-mt-lg">
                    <q-btn class="gradient-button q-px-md" flat dense no-caps @click="goTo('Bookings')">
                        {{ t('appButton') }}
                    </q-btn>
                </div>
                <div class="row flex-center q-mt-xl">
                    <div class="menu-button link-button"
                         @click="changeLocale('en')"
                         :class="{ 'text-primary': selectedLocale === 'en' }">
                        English
                    </div>
                    <div class="text-bold q-mx-sm">|</div>
                    <div class="menu-button link-button"
                         @click="changeLocale('es')"
                         :class="{ 'text-primary': selectedLocale === 'es' }">
                        Español
                    </div>
                </div>
                <div class="row flex-center q-mt-md">
                    <div class="social-button link-button q-mr-lg" @click="goToDiscord">
                        <q-icon name="fa-brands fa-discord"/>
                    </div>
                    <div class="social-button link-button" @click="goToTwitter">
                        <q-icon name="fa-brands fa-twitter"/>
                    </div>
                </div>
            </div>
        </div>

        <q-page-container>
            <q-page :padding="false" :style-fn="handlePageStyle" class="overflow-auto">
                <q-scroll-area class="full-height full-width" ref="scrollAreaEl">
                    <div id="particles-js" class="absolute-full"></div>
                    <div class="bg-container absolute-full">
                        <div class="net-top"></div>
                        <div class="tail-top"></div>
                    </div>
                    <router-view/>

                    <footer>
                        <div class="max-page-width">
                            <q-toolbar class="relative-position items-center">
                                <div class="absolute-full flex flex-center">
                                    <img src="~assets/landing/name.png" alt="suri" style="height: 24px" class="name"/>
                                </div>

                                <div class="text-weight-light relative-position" v-if="!globalStore.isMobile">
                                    All rights reserved 2022<br/>
                                    Developed by
                                    <a href="https://www.linkedin.com/company/treviware" target="_blank">Treviware</a>
                                </div>
                                <div class="text-weight-light flex items-center relative-position" v-else>
                                    <a href="https://www.linkedin.com/company/treviware"
                                       target="_blank"
                                       class="q-mr-xs">Treviware</a>
                                    © 2022
                                </div>
                                <q-space/>
                                <div class="row items-center q-mr-xl relative-position" v-if="!globalStore.isMobile">
                                    <div class="menu-button link-button" @click="changeLocale('en', true)" :class="{
                                            'text-primary':
                                                selectedLocale === 'en',
                                        }">
                                        EN
                                    </div>
                                    <div class="text-bold q-mx-xs">|</div>
                                    <div class="menu-button link-button" @click="changeLocale('es', true)" :class="{
                                            'text-primary':
                                                selectedLocale === 'es',
                                        }">
                                        ES
                                    </div>
                                </div>
                                <div class="social-button link-button q-mr-lg" @click="goToDiscord">
                                    <q-icon name="fa-brands fa-discord"/>
                                </div>
                                <div class="social-button link-button q-mr-md" @click="goToTwitter">
                                    <q-icon name="fa-brands fa-twitter"/>
                                </div>
                            </q-toolbar>
                        </div>
                    </footer>
                </q-scroll-area>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<style lang="scss" scoped>
.q-header {
    background-color: rgba(3, 12, 44, 0.8);

    .q-toolbar {
        height: 68px;
    }

    .header-border {
        height: 2px;
    }

    .menu-button {
        font-size: 16px;
        font-weight: bold;

        &:last-of-type {
            margin-right: 0;
        }
    }

    .social-button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        margin-right: 12px;

        &:last-of-type {
            margin-right: 0;
        }
    }
}

footer {
    background-color: rgba(3, 12, 44, 0.44);

    .q-toolbar {
        height: 68px;
    }

    .social-button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: #87888a;
    }

    a {
        text-decoration: none !important;

        &:hover {
            font-weight: 400;
            color: $primary;
        }
    }
}

.q-page-container {
    padding-top: 0 !important;
    background-color: #250054;
}

#particles-js:deep(canvas) {
    display: block;
}

.bg-container {
    overflow: hidden;

    .tail-top {
        position: absolute;
        background-image: url("assets/landing/bg-tail-top.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        $width: 1000px;
        height: $width * 1226 / 993;
        width: $width;
        top: 50vh;
        left: 50%;
        transform: translateX(-24%) translateY(-65%);
    }

    .net-top {
        position: absolute;
        background-image: url("assets/landing/bg-net.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        $height: 1000px;
        height: $height;
        width: $height * 1360 / 1039;
        top: 50vh;
        right: 50%;
        transform: translateX(11%) translateY(25%);
    }
}

.q-scrollarea:deep(.q-scrollarea__container) {
    overflow-x: hidden;
}

// MOBILE ---------------------------------------------------------------------
.suri-mobile {
    .q-header {
        transition: background-color 0.3s ease;

        &.drawer-open {
            background-color: rgba(3, 12, 44, 1);
        }

        .q-toolbar {
            height: 56px;
        }

        .logo {
            height: 28px !important;
        }
    }

    footer {
        .q-toolbar {
            height: 56px;
        }

        .name {
            height: 20px !important;
        }

        .social-button {
            font-size: 20px;
        }
    }

    .mobile-menu {
        position: absolute;
        top: 58px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3000;

        .container {
            width: 288px;
            max-width: 80vw;
        }

        .menu-button {
            font-size: 16px;
            font-weight: bold;
            text-align: center;

            .gradient-button {
                font-size: 14px;
            }

            &:last-of-type {
                margin-right: 0;
            }
        }

        .social-button {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }
    }

    .bg-container {
        overflow: hidden;

        .tail-top {
            $width: 800px;
            height: $width * 1226 / 993;
            width: $width;
            top: 0;
            left: 50%;
            transform: translateX(-50%) translateY(-48%);
        }

        .net-top {
            $height: 500px;
            height: $height;
            width: $height * 1360 / 1039;
            top: 460px;
            right: 50%;
            transform: translateX(11%) translateY(25%);
        }
    }
}
</style>

<i18n lang="yaml">
en:
    pageTitle: The Suri Project
    logoAlt: The Suri Project
    appButton: App
    docsButton: Documentation
es:
    pageTitle: El Proyecto Suri
    logoAlt: El Proyecto Suri
    appButton: App
    docsButton: Documentación
</i18n>
