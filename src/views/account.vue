<template>
  <div class="account">
    <div class="header">
      <van-image width="4.5rem" height="4.5rem" round :src="avatarUrl" @click="getUser" />
    </div>
    <div class="info">
      <van-cell-group inset>
        <van-cell title="Account" :value="variable.user.username" :label="variable.user.id" />
        <van-cell title="Email" :value="variable.user.email" />
        <van-cell title="HV balance" :value="variable.user.hv_balance" />
        <van-cell title="Phone" :value="variable.user.phone_number" />
        <van-cell title="Nonce" :value="variable.user.nonce" />
      </van-cell-group>
    </div>
    <div class="btn-logout">
      <van-button round block type="primary" @click="logout">LOGOUT</van-button>
    </div>
  </div>
</template>
<script setup name="account">
import { Notify } from 'vant'
import { useRouter } from 'vue-router'

import api from '@/api'
import tools from '@/utils/tools'

import { useConstantStore } from '@/pinia/constant'
import { useVariableStore } from '@/pinia/variable'

import avatarUrl from '@/assets/img/avatar.jpg'

const router = useRouter()
const constant = useConstantStore()
const variable = useVariableStore()

const logout = () => {
  api.auth
    .logout()
    .then(() => {
      tools.logout()
      router.push('/login')
    })
    .catch(() => {})
}

const getUser = () => {
  api.auth.user().then((res) => {
    if (res.status == constant.status_code.success) {
      variable.user = res.user
      sessionStore.set(res.access_token)
      variable.timestamp = new Date().getTime()
    } else {
      Notify({
        message: res.message,
        type: 'danger',
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.account {
  height: 100%;
  overflow: hidden;
  .header {
    text-align: center;
    margin: 1rem;
  }

  .btn-logout {
    margin: 2rem;
  }
}
</style>
