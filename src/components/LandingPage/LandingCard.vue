<script lang="ts" setup>
// REFS -----------------------------------------------------------------------
// COMPUTED -------------------------------------------------------------------
// METHODS --------------------------------------------------------------------
// WATCHES --------------------------------------------------------------------
// HOOKS ----------------------------------------------------------------------
</script>

<template>
    <div class="landing-card relative-position">
        <div class="landing-card-bg absolute-full"></div>
        <q-card class="landing-card-content full-width full-height">
            <slot />
        </q-card>
    </div>
</template>

<style lang="scss" scoped>
.landing-card {
    box-shadow: none;
    padding: 5px;
}

.landing-card-bg {
    background-color: transparent;
    background-image: linear-gradient(
        90deg,
        rgba(3, 12, 44) 0%,
        rgba(37, 0, 84) 44.6927%,
        rgba(57, 7, 62) 75.6983%,
        rgba(55, 6, 64) 91.3408%
    );
    border-radius: 36px;
    filter: blur(5px);
    opacity: 50%;
}

.landing-card-content {
    $opacity: 0.8;
    background-color: transparent;
    background-image: linear-gradient(
        90deg,
        rgba(3, 12, 44, $opacity) 0%,
        rgba(37, 0, 84, $opacity) 44.6927%,
        rgba(57, 7, 62, $opacity) 75.6983%,
        rgba(55, 6, 64, $opacity) 91.3408%
    );
    border-radius: 36px;
    box-shadow: none;
}
</style>
