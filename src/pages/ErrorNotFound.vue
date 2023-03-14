<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';
import { initParticles } from 'boot/particles';
import { useGlobalStore } from 'stores/global';

const { t } = useI18n();
const globalStore = useGlobalStore();

// REFS -----------------------------------------------------------------------
// COMPUTED -------------------------------------------------------------------
// METHODS --------------------------------------------------------------------
// WATCHES --------------------------------------------------------------------
// HOOKS ----------------------------------------------------------------------
onMounted(() => {
    initParticles('particles-js-error');
});
</script>

<template>
    <div
        class="fullscreen text-center q-pa-md flex flex-center error-container"
        :class="{ 'suri-mobile': globalStore.isMobile }"
    >
        <div id="particles-js-error" class="absolute-full"></div>
        <div class="bg-container absolute-full">
            <div class="tail"></div>
        </div>
        <div>
            <div class="error-number">404</div>

            <q-separator class="bg-gradient-theme-to-right q-mt-md q-mb-xl" />

            <div class="error-message">
                {{ t('message') }}
            </div>

            <q-btn
                class="q-mt-xl q-px-lg yellow-gradient-button button"
                flat
                :to="{ name: 'Home' }"
                :label="t('goHomeButton')"
                no-caps
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.error-container {
    background-image: linear-gradient(
        180deg,
        #030c2c 0%,
        #250054 80.2915%,
        #250054 100%
    );
}

.error-number {
    $font-size: 220px;
    font-size: $font-size;
    line-height: $font-size;
    font-weight: 900;
    font-style: italic;
}

.error-message {
    $font-size: 48px;
    font-size: $font-size;
    line-height: $font-size;
    font-weight: 300;
}

.button {
    border-radius: 6px;
}

.bg-container {
    overflow: hidden;

    .tail {
        position: absolute;
        background-image: url('assets/landing/bg-tail-top.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        $width: 1000px;
        height: $width * 1226 / 993;
        width: $width;
        top: 50vh;
        left: 50%;
        transform: translateX(-50%) translateY(-65%);
    }
}

// Mobile ---------------------------------------------------------------------
.error-container.suri-mobile {
    .error-number {
        $font-size: 120px;
        font-size: $font-size;
        line-height: $font-size;
    }

    .error-message {
        $font-size: 24px;
        font-size: $font-size;
        line-height: $font-size;
    }

    .button {
        border-radius: 6px;
    }

    .bg-container {
        overflow: hidden;

        .tail {
            position: absolute;
            background-image: url('assets/landing/bg-tail-top.png');
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            $width: 600px;
            height: $width * 1226 / 993;
            width: $width;
            top: 50vh;
            left: 50%;
            transform: translateX(-50%) translateY(-65%);
        }
    }
}
</style>

<i18n lang="yaml">
en:
    message: Oops! Nothing here...
    goHomeButton: Go Home
es:
    message: ¡Ups! No hay nada aquí...
    goHomeButton: Ir al inicio
</i18n>
