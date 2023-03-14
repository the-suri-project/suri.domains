<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import suriImage from '../../assets/landing/structure-suri.png';
import sunsImage from '../../assets/landing/structure-suns.png';
import nftImage from '../../assets/landing/structure-nft.png';
import { computed } from 'vue';
import LandingCard from 'components/LandingPage/LandingCard.vue';
import { useGlobalStore } from 'stores/global';

const { t, locale } = useI18n();
const globalStore = useGlobalStore();

// REFS -----------------------------------------------------------------------
// COMPUTED -------------------------------------------------------------------
const localeLink = computed(() => {
    if (locale.value === 'en') {
        return '';
    } else {
        return `/${locale.value}`;
    }
});
const sections = computed(() => [
    {
        id: 'suris',
        img: suriImage,
        title: t('suris.title'),
        description: t('suris.description'),
        buttonUrl: `https://docs.suri.domains${localeLink.value}/domains/`,
    },
    {
        id: 'suns',
        img: sunsImage,
        title: t('suns.title'),
        description: t('suns.description'),
        buttonUrl: `https://docs.suri.domains${localeLink.value}/protocol`,
    },
    {
        id: 'nfts',
        img: nftImage,
        title: t('nfts.title'),
        description: t('nfts.description'),
        buttonUrl: `https://docs.suri.domains${localeLink.value}/domains/nfts`,
    },
]);

// METHODS --------------------------------------------------------------------
function goTo(url: string) {
    window.open(url, '_blank');
}

// WATCHES --------------------------------------------------------------------
// HOOKS ----------------------------------------------------------------------
</script>

<template>
    <div
        class="landing-structure max-page-width q-px-xl"
        :class="{ 'suri-mobile': globalStore.isMobile }"
    >
        <h1 class="text-center q-pb-md">{{ t('title') }}</h1>
        <div class="flex flex-center">
            <div class="text-center description"></div>
        </div>
        <div class="column flex-center gap-lg sections">
            <LandingCard
                class="section"
                v-for="section in sections"
                :key="section.id"
            >
                <div
                    class="section-container full-width full-height row no-wrap gap-md"
                >
                    <div class="image-container flex flex-center">
                        <img :src="section.img" :alt="section.title" />
                    </div>
                    <div
                        class="text-content q-px-lg q-py-lg full-width flex flex-center"
                    >
                        <div>
                            <div
                                class="title bg-gradient-yellow-orange-to-right q-mb-lg"
                            >
                                {{ section.title }}
                            </div>
                            <q-separator class="bg-gradient-theme-to-right" />
                            <div class="q-my-sm">{{ section.description }}</div>
                            <q-separator class="bg-gradient-theme-to-right" />
                            <div class="flex flex-center q-mt-lg">
                                <q-btn
                                    class="yellow-gradient-button button"
                                    flat
                                    rounded
                                    no-caps
                                    @click="goTo(section.buttonUrl)"
                                    >{{ t('moreInfoButton') }}
                                </q-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </LandingCard>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.landing-structure {
    z-index: 1000;
    position: relative;
    margin-top: calc((-13 / 25) * 100vh + 520px);

    &:deep(a:hover) {
        color: $secondary;
    }
}

h1 {
    font-size: 34px;
    font-weight: 900;
    line-height: 40px;
}

.description {
    font-size: 22px;
    font-weight: 300;
    line-height: 30px;
    padding-bottom: 75px;
}

.section {
    width: 800px;
    height: 280px;

    .section-container {
        border-radius: 36px;
        overflow: hidden;
    }

    .image-container {
        width: 288px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url('../../assets/landing/structure-bg.png');
        flex-shrink: 0;
        flex-grow: 0;
        padding-right: 96px;

        img {
            max-width: 200px;
            max-height: 200px;
            object-fit: contain;
        }
    }

    .text-container {
        flex-shrink: 1;
    }

    .title {
        $font-size: 44px;
        font-size: $font-size;
        line-height: $font-size;
        font-weight: 900;
        background-clip: text;
        -webkit-background-clip: text;
        color: rgba(0, 0, 0, 0);
    }
}

// Mobile ---------------------------------------------------------------------
.landing-structure.suri-mobile {
    margin-top: 0;
    padding-bottom: 90px;

    h1 {
        font-size: 30px;
        line-height: 36px;
    }

    .description {
        font-size: 18px;
        line-height: 26px;
        padding-bottom: 45px;
    }

    .sections {
        flex-flow: row;
        flex-wrap: wrap;
        align-items: stretch;
    }

    .section {
        width: 280px;
        height: auto;

        .image-container {
            width: 100%;
            height: 288px;
            background-image: url('../../assets/landing/structure-bg-mobile.png');
            padding-right: 0;
            padding-bottom: 96px;

            img {
                max-width: 200px;
                max-height: 180px;
                object-fit: contain;
            }
        }

        .title {
            $font-size: 34px;
            font-size: $font-size;
            line-height: $font-size;
        }

        .section-container {
            flex-flow: column;
        }

        .text-content {
            padding-top: 0;
        }
    }
}
</style>

<i18n lang="yaml">
en:
    title: How Suri works
    suris:
        title: Suri Domains
        description: Suri domains, or simply, suris, will allow users to be recognized and reached easily. Suris are also much more powerful than their web2 counterparts, since they can link to plenty of utilities, all thanks to the enhanced features of SUNS program.
    suns:
        title: SUNS Program
        description: SUNS is the technlology behind this project. It is a Web3 native version of the current DNS (Domain Name Service) system, but much more powerful thanks to being built on Solana network’s blockchain, and it is also fully decentralized.
    nfts:
        title: NFTs
        description: NFTs represent the ownership of a Suri domain. They will facilitate the understanding of the status of a Suri to its owner, as well as the trading capabilities. NFTs do not possess true value if the suri behind them is expired.
    moreInfoButton: More info
es:
    title: Como funciona Suri
    suris:
        title: Dominios Suri
        description: Los dominios Suri, o simplemente, suris, permitirán a los usuarios ser reconocidos y localizados fácilmente. Además, los suris son mucho más potentes que sus homólogos de web2, ya que pueden ser vinculadas con multitud de utilidades, todo ello gracias a las características mejoradas del protocolo SUNS.
    suns:
        title: Protocolo SUNS
        description: SUNS es la tecnología detrás de Suri. Se trata de una versión nativa de Web3 del actual sistema DNS (Domain Name Service), pero mucho más potente. Esto es gracias a estar construido sobre la blockchain de Solana. Además, está totalmente descentralizado.
    nfts:
        title: NFTs
        description: En el proyecto Suri, los NFTs se utilizan para representar la propiedad de un dominio. Facilitan la comprensión del estado de un Suri a su propietario, así como las capacidades de negociación. Los NFTs no poseen un valor real si el Suri que los respalda está caducado.
    moreInfoButton: Más información
</i18n>
