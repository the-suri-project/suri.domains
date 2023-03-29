<script lang="ts" setup>
import {useI18n} from 'vue-i18n';
import {computed, ref} from 'vue';
import LandingCard from 'components/LandingPage/LandingCard.vue';
import {useGlobalStore} from 'stores/global';
import {Query, QueryStandard} from '@suri-project/suns-sdk';
import {solanaConnection} from 'boot/solana';
import biri from 'biri';

const {
    t,
    locale,
} = useI18n();
const globalStore = useGlobalStore();

// REFS -----------------------------------------------------------------------
const loading = ref(false);
const search = ref('');

// COMPUTED -------------------------------------------------------------------
const localeLink = computed(() => {
    if (locale.value === 'en') {
        return '';
    } else {
        return `/${locale.value}`;
    }
});

// METHODS --------------------------------------------------------------------
function openDocs() {
    window.open(`https://docs.suri.domains${localeLink.value}/`, '_blank');
}

async function go() {
    debugger;
    loading.value = true;

    try {
        const browserIdPromise = biri();
        let query = Query.tryFromAnyFormat(search.value);

        if (!query.standard) {
            query = query.clone();
            query.standard = new QueryStandard('web', null, null);
        }

        if (!query.standard.valueType) {
            query.standard.valueType = 'URL';
        }

        // Resolve the query.
        const queryResult = await query.execute(solanaConnection);

        if (!queryResult.found) {
            resolve();

            loading.value = false;
            return;
        }

        const urls = await queryResult.recordPage!.data.resolveUrl(solanaConnection, {
            seeds: Buffer.from(await browserIdPromise),
            maxHopes: 10,
            maxResults: 1,
        });

        if (urls.length === 0) {
            resolve();

            loading.value = false;
            return;
        }

        let url = urls[0].toString();

        for (const replacement of query.replacements) {
            url = replacement.processForUrl(url);
        }

        window.open(url, '_self');
    } catch (e: any) {
        resolve();
    }

    loading.value = false;
}

function resolve() {
    window.open(`https://app.suri.domains/explorer/results?query=${encodeURIComponent(search.value)}`, '_self');
}

// WATCHES --------------------------------------------------------------------
// HOOKS ----------------------------------------------------------------------
</script>

<template>
    <div class="landing-hero q-px-xl" :class="{ 'suri-mobile': globalStore.isMobile }">
        <div class="landing-hero-container max-page-width row items-center justify-center full-width full-height">
            <div class="col-6 flex items-center justify-end">
                <LandingCard class="info">
                    <div class="info-container">
                        <div class="title bg-gradient-yellow-orange-to-right">
                            {{ t('title') }}
                        </div>
                        <q-separator class="bg-gradient-theme-to-right q-mt-lg"/>
                        <div class="q-my-md">{{ t('description') }}</div>
                        <q-separator class="bg-gradient-theme-to-right"/>
                        <div class="flex flex-center q-mt-lg">
                            <q-btn class="yellow-gradient-button button" flat rounded no-caps @click="openDocs">{{
                                    t('readDocsButton')
                                }}
                            </q-btn>
                        </div>
                    </div>
                </LandingCard>
            </div>
            <div class="col-6 flex items-center justify-start">
                <div>
                    <div class="text-center" style="width: 400px; max-width: 100%">
                        <img src="~assets/landing/name.png" alt="suri" style="height: 70px"/>
                    </div>
                    <div class="q-mt-lg">
                        <q-input v-model="search"
                                 dense
                                 standout
                                 rounded
                                 class="searchbar q-mx-auto"
                                 @keydown.enter="go"
                                 :placeholder="t('inputPlaceholder')">
                            <template v-slot:prepend v-if="!globalStore.isMobile">
                                <q-icon name="fa-solid fa-search" color="white" size="16px"/>
                            </template>
                            <template v-slot:append>
                                <q-btn class="gradient-button q-px-md"
                                       flat
                                       dense
                                       rounded
                                       no-caps
                                       @click="go"
                                       :loading="loading"
                                       v-if="!globalStore.isMobile">{{ t('searchButton') }}
                                </q-btn>
                                <q-btn class="gradient-button q-px-md"
                                       flat
                                       dense
                                       round
                                       no-caps
                                       v-else
                                       @click="go"
                                       :loading="loading">
                                    <q-icon name="fa-solid fa-search"
                                            class="flip-horizontal"
                                            color="white"
                                            size="16px"/>
                                </q-btn>
                            </template>
                        </q-input>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.landing-hero {
    height: 0;
    min-height: 100vh;
    padding-top: 70px;
    background-image: linear-gradient(
            180deg,
            #030c2c 0%,
            #250054 80.2915%,
            #250054 100%
    );
}

.landing-hero-container {
    $gap: 90px;
    gap: $gap;

    & > div {
        width: calc(50% - #{$gap / 2});
    }
}

.info {
    width: 480px;
    max-width: 100%;

    .info-container {
        padding: 40px;
    }

    .title {
        $font-size: 54px;
        font-size: $font-size;
        line-height: $font-size;
        font-weight: 900;
        background-clip: text;
        -webkit-background-clip: text;
        color: rgba(0, 0, 0, 0);
    }
}

.content {
    width: 580px;
    max-width: 100%;
}

.searchbar {
    width: 410px;
    max-width: 100%;

    &:deep(.q-field__control) {
        padding-right: 8px;
        background-color: rgb(255, 255, 255, 0.45);
    }

    &:deep(input) {
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
    }

    &.q-field--highlighted {
        &:deep(.q-field__control) {
            background-color: rgb(255, 255, 255, 0.45);
        }

        &:deep(input) {
            color: white !important;
        }
    }

    &:deep(.q-field__prepend) {
        padding-right: 10px;
    }

    &:deep(::placeholder) {
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
    }
}

.order-now-msg {
    $font-size: 54px;
    font-size: $font-size;
    line-height: $font-size;
    font-weight: 900;
    background-clip: text;
    -webkit-background-clip: text;
    color: rgba(0, 0, 0, 0);

    &.animated {
        background-size: 300% 100%;
        animation: jello-horizontal 4s linear 3s both infinite, wobble-hor-bottom 4s linear 5s infinite, change-bg-color 3s linear both infinite;
    }
}

@keyframes jello-horizontal {
    0% {
        transform: scale3d(1, 1, 1);
    }
    #{30%*25/100} {
        transform: scale3d(1.25, 0.75, 1);
    }
    #{40%*25/100} {
        transform: scale3d(0.75, 1.25, 1);
    }
    #{50%*25/100} {
        transform: scale3d(1.15, 0.85, 1);
    }
    #{65%*25/100} {
        transform: scale3d(0.95, 1.05, 1);
    }
    #{75%*25/100} {
        transform: scale3d(1.05, 0.95, 1);
    }
    25% {
        transform: scale3d(1, 1, 1);
    }
}

@keyframes wobble-hor-bottom {
    0% {
        transform: translateX(0%);
        transform-origin: 50% 50%;
    }
    #{15%*25/100} {
        transform: translateX(-30px) rotate(-6deg);
    }
    #{30%*25/100} {
        transform: translateX(15px) rotate(6deg);
    }
    #{45%*25/100} {
        transform: translateX(-15px) rotate(-3.6deg);
    }
    #{60%*25/100} {
        transform: translateX(9px) rotate(2.4deg);
    }
    #{75%*25/100} {
        transform: translateX(-6px) rotate(-1.2deg);
    }
    25% {
        transform: translateX(0%);
        transform-origin: 50% 50%;
    }
}

@keyframes change-bg-color {
    0% {
        background-position: 0 0;
    }
    50% {
        background-position: 100% 0;
    }
    100% {
        background-position: 0 0;
    }
}


// Mobile ---------------------------------------------------------------------
.landing-hero.suri-mobile {
    width: 100vw;
    height: auto;
    padding: 180px 20px 80px;

    .landing-card {
        margin-top: 80px;
    }

    .landing-hero-container {
        flex-flow: column-reverse;

        & > div {
            width: 100%;
            justify-content: center;

            & > div {
                width: 100%;
            }
        }

        .searchbar {
            width: 100%;
            max-width: 400px;
        }

        .info {
            width: 100%;
            max-width: 500px;

            .title {
                $font-size: 36px;
                font-size: $font-size;
                line-height: $font-size;
            }
        }
    }

    .order-now-msg {
        $font-size: 36px;
        font-size: $font-size;
        line-height: $font-size;
    }
}
</style>

<i18n lang="yaml">
en:
    title: 'The foundation of Web3'
    description: 'Suri offers the core infrastructure layer for the next generation of Internet by operating decentralized, enhanced Internet domains with an upgraded protocol to resolve them.'
    inputPlaceholder: Search for a suri...
    searchButton: Search
    readDocsButton: Read more
    appButton: Go to App
    preOrderNow: Pre-Order now!
es:
    title: 'La piedra angular de Web3'
    description: 'Suri provee la capa de infraestructura base para la próxima generación de Internet: web3, ofreciendo dominios de Internet descentralizados y potenciados con un novedoso protocolo (SUNS) que permite resolverlos.'
    inputPlaceholder: Resuelve un suri...
    searchButton: Buscar
    readDocsButton: Leer más
    appButton: Ir a la aplicación
    preOrderNow: ¡Reserva ahora!
</i18n>
