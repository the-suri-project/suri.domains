<script lang="ts" setup>
import {useI18n} from 'vue-i18n';
import {useGlobalStore} from 'stores/global';
import {computed} from 'vue';

const {t} = useI18n();
const globalStore = useGlobalStore();

const memberList = [{
    id: 'julio',
    avatar: '/team/julio.png',
    name: 'Julio Treviño',
    title: 'CEO / Developer',
    links: [{
        icon: 'github',
        link: 'https://github.com/juliotpaez',
    }, {
        icon: 'twitter',
        link: 'https://twitter.com/juliotpaez',
    }, {
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/julio-trevi%C3%B1o-p%C3%A1ez/',
    }],
}, {
    id: 'yajaira',
    avatar: '/team/yajaira.jpeg',
    name: 'Yajaira Martínez',
    title: 'CMO',
    links: [{
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/yajaira-thibisay-martinez-jaimes/',
    }],
}];

// REFS -----------------------------------------------------------------------
// COMPUTED -------------------------------------------------------------------
const members = computed(() => memberList);

// METHODS --------------------------------------------------------------------
function openLink(link: string) {
    window.open(link, '_blank');
}

// WATCHES --------------------------------------------------------------------
// HOOKS ----------------------------------------------------------------------
</script>

<template>
    <div class="landing-team max-page-width q-px-xl" :class="{ 'suri-mobile': globalStore.isMobile }">
        <h1>{{ t('title') }}</h1>
        <div class="members full-width row flex-center">
            <div class="member" v-for="member in members" :key="member.id">
                <div class="image-container flex flex-center relative-position">
                    <div class="image-bg absolute-center bg-gradient-theme-to-right"></div>
                    <img :src="member.avatar" :alt="member.name" class="relative-position"/>
                </div>
                <div class="text-center title q-mt-lg">{{ member.name }}</div>
                <div class="text-center job q-mt-md">
                    {{ t(`${member.id}.job`) }}
                </div>
                <div class="text-center links row justify-center gap-md q-mt-md">
                    <div v-for="link in member.links" :key="link.link">
                        <q-btn class="yellow-gradient-button button"
                               flat
                               round
                               @click="openLink(link.link)"
                               :to="{ name: 'Home' }"
                               :icon="`fa-brands fa-${link.icon}`"
                               no-caps/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.landing-team {
    z-index: 1000;
    position: relative;
    padding-bottom: 335px;
}

h1 {
    font-size: 71px;
    font-weight: 900;
    line-height: 71px;
    padding-bottom: 90px;
}

.members {
    gap: 80px;

    .member {
        .image-container {
            padding: 5px;
            border-radius: 100%;

            .image-bg {
                border-radius: 100%;
                filter: blur(5px);
                width: 226px;
                height: 226px;
                transform: translate(-50%, -50%);
            }

            img {
                display: block;
                width: 216px;
                height: 216px;
                object-fit: cover;
                border-radius: 100%;
            }
        }

        .title {
            font-weight: 400;
            font-size: 26px;
        }

        .job {
            font-weight: 300;
            font-size: 20px;
        }
    }
}

// Mobile ---------------------------------------------------------------------

.landing-team.suri-mobile {
    padding-bottom: 150px;

    h1 {
        font-size: 62px;
        line-height: 62px;
        text-align: center;
    }

    .members {
        flex-flow: column;
    }
}
</style>

<i18n lang="yaml">
en:
    title: Team
    julio:
        job: CEO & CTO
    yajaira:
        job: CMO
    david:
        job: Designer
es:
    title: Equipo
    julio:
        job: CEO & CTO
    yajaira:
        job: CMO
    david:
        job: Diseñador
</i18n>
