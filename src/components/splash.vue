<template>
  <div class="splash" v-if="show" @click="onFinish">
    <img :src="splash" alt />
    <div class="down">
      <van-count-down :time="time" format="ss" @finish="onFinish">
        <template #default="timeData">
          <span class="block">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import splash from '@/assets/img/splash.png'
const time = ref(5 * 1000)
const show = ref(true)
const onFinish = () => {
  show.value = false
}
</script>
<style lang="scss" scoped>
.splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
  img {
    object-fit: cover;
    width: 100%;
  }

  .down {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 100001;
    .block {
      padding: 0.15rem 0.4rem;
      border-radius: 0.2rem;
      background: rgba(61, 194, 198, 0.288);
      color: #fff;
    }
  }
}
</style>
