<template>
  <div class="contain">
    <router-view />
    <v-splash />
  </div>
</template>

<script setup>
import vSplash from '@/components/splash.vue'
import { useVariableStore } from '@/pinia/variable'
const variable = useVariableStore()
</script>

<style lang="scss">
@import '@/assets/css/main.scss';
.contain {
  height: 100%;
}
</style>
