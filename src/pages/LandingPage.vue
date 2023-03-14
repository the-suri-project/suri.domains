<script setup lang="ts">
import LandingTeam from 'components/LandingPage/LandingTeam.vue';
import LandingContact from 'components/LandingPage/LandingContact.vue';
import LandingFeatures from 'components/LandingPage/LandingFeatures.vue';
import LandingHero from 'components/LandingPage/LandingHero.vue';
import LandingStructure from 'components/LandingPage/LandingStructure.vue';
import { useGlobalStore } from 'stores/global';
import LandingRoadmap from 'components/LandingPage/LandingRoadmap.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { scrollToElement } from 'src/utils/scroll';

const globalStore = useGlobalStore();
const route = useRoute();

// REFS -----------------------------------------------------------------------
const structureAnchorEl = ref<HTMLElement>();
const featuresAnchorEl = ref<HTMLElement>();
const teamAnchorEl = ref<HTMLElement>();
const roadmapAnchorEl = ref<HTMLElement>();
const contactAnchorEl = ref<HTMLElement>();

// COMPUTED -------------------------------------------------------------------
// METHODS --------------------------------------------------------------------
// WATCHES --------------------------------------------------------------------
// HOOKS ----------------------------------------------------------------------
onMounted(() => {
    setTimeout(() => {
        switch (route.hash) {
            case '#team':
                scrollToElement(teamAnchorEl.value!);
                break;
            case '#features':
                scrollToElement(featuresAnchorEl.value!);
                break;
            case '#structure':
                scrollToElement(structureAnchorEl.value!);
                break;
            case '#roadmap':
                scrollToElement(roadmapAnchorEl.value!);
                break;
            case '#contact':
                scrollToElement(contactAnchorEl.value!);
                break;
        }
    }, 100);
});
</script>

<template>
    <LandingHero />
    <div class="bg full-width">
        <div class="anchor offset" ref="structureAnchorEl"></div>
        <LandingStructure />
        <div
            class="middle-block relative-position"
            :class="{ 'suri-mobile': globalStore.isMobile }"
        >
            <div class="net-middle n1"></div>
            <div class="net-middle n2"></div>
            <div class="tail-middle"></div>
        </div>
        <div class="anchor offset" ref="featuresAnchorEl"></div>
        <LandingFeatures />
        <div
            class="middle-block relative-position"
            :class="{ 'suri-mobile': globalStore.isMobile }"
        >
            <div class="net-bottom"></div>
            <div class="tail-bottom"></div>
        </div>
        <div class="anchor" ref="teamAnchorEl"></div>
        <LandingTeam />
        <div class="anchor" ref="roadmapAnchorEl"></div>
        <LandingRoadmap />
    </div>
    <div class="anchor" ref="contactAnchorEl"></div>
    <LandingContact />
</template>

<style lang="scss" scoped>
.middle-block {
    width: 100%;
    height: 260px;
}

.bg {
    background-image: linear-gradient(
        0deg,
        #030c2c 0%,
        #250054 80.2915%,
        #250054 100%
    );
}

.tail-middle {
    position: absolute;
    background-image: url('assets/landing/bg-tail-middle.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    $width: 2000px;
    width: $width + 700px;
    height: $width * 1424 / 2373;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-20%);
}

.net-middle {
    position: absolute;
    background-image: url('assets/landing/bg-net.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    $height: 1000px;
    height: $height;
    width: $height * 1360 / 1039;

    &.n1 {
        top: 67px;
        left: 50%;
        transform: translateX(30%);
    }

    &.n2 {
        top: 1000px;
        left: 50%;
        transform: translateX(-110%);
    }
}

.tail-bottom {
    position: absolute;
    background-image: url('assets/landing/bg-tail-bottom.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    $width: 4500px;
    width: $width;
    height: $width * 993 / 1226;
    top: 0;
    left: 50%;
    transform: translateX(-30%) translateY(-40%);
}

.net-bottom {
    position: absolute;
    background-image: url('assets/landing/bg-net.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    $height: 1000px;
    height: $height;
    width: $height * 1360 / 1039;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
}

.anchor {
    height: 0;
    width: 0;
    position: relative;
    top: -70px;

    &.offset {
        top: -90px;
    }
}

// MOBILE ---------------------------------------------------------------------
.middle-block.suri-mobile {
    height: 90px;

    .tail-middle {
        $width: 1000px;
        width: $width;
        height: $width * 1424 / 2373;
        top: 0;
        left: 50%;
        transform: translateX(-50%) translateY(-30%);
    }

    .net-middle {
        $height: 400px;
        height: $height;
        width: $height * 1360 / 1039;

        &.n1 {
            top: 400px;
            left: 50%;
            transform: translateX(-100%);
        }

        &.n2 {
            top: 1600px;
            left: 50%;
            transform: translateX(0%) scaleX(-1) scaleY(-1);
        }
    }

    .tail-bottom {
        $width: 3500px;
        width: $width;
        height: $width * 993 / 1226;
        top: 0;
        left: 50%;
        transform: translateX(-26%) translateY(-50%);
    }

    .net-bottom {
        $height: 400px;
        height: $height;
        width: $height * 1360 / 1039;
        top: 200px;
        left: 50%;
        transform: translateX(-50%);
    }

    .anchor {
        top: 0;

        &.offset {
            top: -70px;
        }
    }
}
</style>
