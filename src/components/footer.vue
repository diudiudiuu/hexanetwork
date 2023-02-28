<template>
  <div>
    <van-tabbar v-model="active" @change="onChange" safe-area-inset-bottom>
      <van-tabbar-item name="wallet" icon="gold-coin">Wallet</van-tabbar-item>
      <van-tabbar-item name="home" icon="wap-home">Home</van-tabbar-item>
      <van-tabbar-item name="account" icon="manager">Account</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const active = ref(router.currentRoute.value.name)
const onChange = (name) => {
  router.push(`/${name}`)
}
</script>
<style lang="scss" scoped>
</style>
