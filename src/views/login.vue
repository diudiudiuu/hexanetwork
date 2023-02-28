<template>
  <div class="home">
    <div class="login">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="email" name="email" placeholder="Email" />
          <van-field v-model="password" type="password" name="password" placeholder="Password" />
        </van-cell-group>
        <div class="btn-login">
          <van-button round block type="primary" native-type="submit">LOGIN</van-button>
        </div>
      </van-form>
    </div>
    <vue-particles
      class="lizi"
      color="#409EFF"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#409EFF"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'vant'
import api from '@/api'
import { useConstantStore } from '@/pinia/constant'
import { useVariableStore } from '@/pinia/variable'
import sessionStore from '@/utils/sessionStore'

const router = useRouter()
const constant = useConstantStore()
const variable = useVariableStore()

const email = ref('')
const password = ref('')
const onSubmit = (values) => {
  const data = {
    email: email.value,
    password: password.value,
  }
  api.auth
    .login(data)
    .then((res) => {
      if (res.status == constant.status_code.success) {
        variable.user = res.user
        sessionStore.set(res.access_token)
        variable.timestamp = new Date().getTime()
        router.replace('/home')
      } else {
        Notify({
          message: res.message,
          type: 'danger',
        })
      }
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow: hidden;
  background-image: url('../assets/img/login_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  .login {
    position: relative;
    top: 5rem;
    z-index: 1;
    margin: 1rem;
    .btn-login {
      margin: 1rem;
    }
  }

  .lizi {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
  }
}
</style>
