<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { DISCORD_URL, TWITTER_URL } from 'app/constants';
import { useGlobalStore } from 'stores/global';

const { t } = useI18n();
const globalStore = useGlobalStore();

// REFS -----------------------------------------------------------------------
// COMPUTED -------------------------------------------------------------------
// METHODS --------------------------------------------------------------------
function goToDiscord() {
    window.open(DISCORD_URL, '_blank');
}

function goToTwitter() {
    window.open(TWITTER_URL, '_blank');
}

// WATCHES --------------------------------------------------------------------
// HOOKS ----------------------------------------------------------------------
</script>

<template>
    <div
        class="landing-contact"
        :class="{ 'suri-mobile': globalStore.isMobile }"
    >
        <div class="max-page-width q-px-xl">
            <h1 class="q-pb-md">{{ t('title') }}</h1>
            <div class="flex flex-center">
                <div>
                    <div class="text-center">
                        <img src="~assets/landing/contact.png" alt="" />
                    </div>
                    <div class="text-center description">
                        {{ t('description') }}
                    </div>
                    <div class="text-center q-mt-lg">
                        <q-btn
                            class="gradient-button q-px-lg q-py-sm"
                            flat
                            dense
                            rounded
                            no-caps
                            icon="fa-brands fa-discord"
                            @click="goToDiscord"
                        />
                        <q-btn
                            class="gradient-button q-px-lg q-ml-md q-py-sm"
                            flat
                            dense
                            rounded
                            no-caps
                            icon="fa-brands fa-twitter"
                            @click="goToTwitter"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.landing-contact {
    padding-bottom: 150px;
    background-image: linear-gradient(
        180deg,
        #030c2c 0%,
        #250054 80.2915%,
        #250054 100%
    );

    &:deep(a:hover) {
        color: $secondary;
    }
}

h1 {
    font-size: 71px;
    font-weight: 900;
    line-height: 71px;
    padding-bottom: 130px;
}

img {
    max-width: 200px;
    max-height: 200px;
    object-fit: contain;
}

.description {
    font-size: 27px;
    line-height: 32px;
    font-weight: bold;
    max-width: 560px;
}

// Mobile ---------------------------------------------------------------------

.landing-contact.suri-mobile {
    h1 {
        font-size: 62px;
        line-height: 62px;
        text-align: center;
        padding-bottom: 90px;
    }
}
</style>

<i18n lang="yaml">
en:
    title: Contact
    description: If you want to know more about us or you have any feedback to improve Suri, do not hesitate to contact us through our discord and follow us on Twitter.
es:
    title: Contacto
    description: Si quieres saber más sobre nosotros o tienes algún comentario para mejorar Suri, no dudes en contactarnos a través de nuestro discord y síguenos en Twitter.
</i18n>
