<script lang="ts" setup>
import {useI18n} from 'vue-i18n';
import {useGlobalStore} from 'stores/global';
import {computed} from 'vue';

const {t} = useI18n();
const globalStore = useGlobalStore();

// REFS -----------------------------------------------------------------------
// COMPUTED -------------------------------------------------------------------
const phase2Description = computed(() => {
    return t('phase2.description')
        .replace('Suri Name Service',
            '<span class="text-weight-bolder">Su</span>ri <span class="text-weight-bolder">N</span>ame <span class="text-weight-bolder">S</span>ervice');
});

// METHODS --------------------------------------------------------------------
// WATCHES --------------------------------------------------------------------
// HOOKS ----------------------------------------------------------------------
</script>

<template>
    <div class="landing-roadmap max-page-width q-px-xl" :class="{ 'suri-mobile': globalStore.isMobile }">
        <h1>{{ t('title') }}</h1>
        <div class="container full-width column flex-center">
            <img src="~assets/landing/roadmap.png"
                 class="roadmap-image"
                 :alt="t('title')"
                 v-if="!globalStore.isMobile"/>
            <img src="~assets/landing/roadmap-mobile.png" class="roadmap-image" :alt="t('title')" v-else/>
            <div class="full-width relative-position text-containers">
                <div class="text-container phase1">
                    <div class="title">{{ t('phase1.title') }}</div>
                    <div class="description">{{ t('phase1.description') }}</div>
                </div>
                <div class="text-container phase2">
                    <div class="title">{{ t('phase2.title') }}</div>
                    <div class="description" v-html="phase2Description"></div>
                </div>
                <div class="text-container phase3">
                    <div class="title">{{ t('phase3.title') }}</div>
                    <div class="description">{{ t('phase3.description') }}</div>
                </div>
                <div class="text-container phase4">
                    <div class="title">{{ t('phase4.title') }}</div>
                    <div class="description">{{ t('phase4.description') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.landing-roadmap {
    z-index: 1000;
    position: relative;
    padding-bottom: 350px;
}

h1 {
    font-size: 71px;
    font-weight: 900;
    line-height: 71px;
    padding-bottom: 90px;
}

.roadmap-image {
    max-width: 86%;
}

$yTop: max(-6vw, -82px);
$yBottom: 0;

.text-container {
    position: absolute;
    width: 23%;
    transform: translateX(-50%);
    text-align: center;

    &.phase1 {
        top: $yTop;
        left: 11.5%;
    }

    &.phase2 {
        top: $yBottom;
        left: 37.1%;
    }

    &.phase3 {
        top: $yTop;
        left: 62.8%;
    }

    &.phase4 {
        top: $yBottom;
        left: 88.6%;
    }

    .title {
        font-size: 26px;
        line-height: 26px;
        font-weight: 600;
        margin-bottom: 10px;
        white-space: pre;
    }

    .description {
        font-size: 20px;
        line-height: 24px;
        opacity: 0.7;
    }
}

// Mobile ---------------------------------------------------------------------

.landing-roadmap.suri-mobile {
    padding-bottom: 150px;
    padding-left: 20px;
    padding-right: 20px;

    h1 {
        font-size: 62px;
        line-height: 62px;
        text-align: center;
    }

    .container {
        flex-flow: row;
        flex-wrap: nowrap;
        align-items: stretch;
        justify-content: center;
        gap: 30px;

        img {
            display: block;
            width: 130px;
        }
    }

    .text-container {
        position: relative;
        width: auto;
        transform: none;
        flex-grow: 0;
        flex-shrink: 0;
        text-align: left;
        left: 0;
        top: 0;

        .title {
            white-space: pre-wrap;
        }

        .description {
            display: none;
        }

        &.phase1 {
            top: 18px;
        }

        &.phase4 {
            top: -14px;
        }
    }

    .text-containers {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        width: auto !important;
    }
}
</style>

<i18n lang="yaml">
en:
    title: Roadmap
    phase1:
        title: "Phase 1\nBookings"
        description: Preparation phase in which users can book their favourites suris
    phase2:
        title: "Phase 2\nSUNS Program"
        description: The Suri Name Service protocol is launched and the system starts to work
    phase3:
        title: "Phase 3\nSuri's Ecosystem"
        description: SUNS Increments & Devs' programs
    phase4:
        title: "Phase 4\nDAO constitution"
        description: The DAO is legally built and the community starts to grow
es:
    title: Roadmap
    phase1:
        title: "Fase 1\nReservas"
        description: Fase de preparación en la que los usuarios pueden reservar sus suris favoritas
    phase2:
        title: "Fase 2\nProtocolo SUNS"
        description: El protocolo Suri Name Service se lanza y el sistema comienza a funcionar
    phase3:
        title: "Fase 3\nEcosistema Suri"
        description: Incrementos de SUNS y programas para desarrolladores
    phase4:
        title: "Fase 4\nConstrucción de la DAO"
        description: La DAO se construye legalmente y la comunidad comienza a crecer
</i18n>
