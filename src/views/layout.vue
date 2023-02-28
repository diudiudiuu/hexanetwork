<template>
  <div class="layout">
    <router-view v-slot="{ Component }">
      <keep-alive :include="variable.keep_alive">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <v-footer />
  </div>
</template>
<script setup name="layout">
import vFooter from '@/components/footer.vue'
import { useVariableStore } from '@/pinia/variable'

const variable = useVariableStore()
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  .van-pull-refresh {
    height: 100%;
  }
}
</style>
