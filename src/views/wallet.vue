<template>
  <div class="wallet">
    <div class="withdraw">
      <van-cell-group inset>
        <van-field label="Amount" v-model="amount" type="digit" />
        <van-field label="BEP20" v-model="bep20_address" type="text" />
      </van-cell-group>
      <div class="btn-withdraw">
        <van-button round block icon="card" type="success" @click="handleClaim">WITHDRAW</van-button>
      </div>
    </div>

    <div class="withdraw-list">
      <div class="withdraw-item" v-for="item in list" :key="item">
        <van-cell :title="`ID: ${item.id}`" :label="item.tx_code" />
        <van-cell title="Wallet ID" :value="item.amount" :label="item.wallet_id" />
        <van-cell title="Status" :value="item.transfer_status" />
        <van-cell title="Created" :label="item.created_at" />
        <van-cell title="Completed" :label="item.completed_at" />
      </div>
    </div>
  </div>
</template>
<script setup name="wallet">
import { ref } from 'vue'
import { Notify } from 'vant'

import api from '@/api'
import tools from '@/utils/tools'

import { useConstantStore } from '@/pinia/constant'
import { useVariableStore } from '@/pinia/variable'

const constant = useConstantStore()
const variable = useVariableStore()

const list = ref([])
console.log(tools.enctryNonce())
const getWalletList = () => {
  api.wallet
    .list()
    .then((res) => {
      if (res.status == constant.status_code.success) {
        list.value = res.wallet
      } else {
        Notify({
          message: res.message,
          type: 'danger',
        })
      }
    })
    .catch(() => {})
}

getWalletList()

const amount = ref(variable.user.balanceData)
const bep20_address = ref('0x5696293023683F7B5a0312eC9f0C1f05f2b03e81')
const handleClaim = () => {
  const data = {
    amount: amount.value,
    bep20_address: bep20_address.value,
    web: true,
  }
  api.wallet
    .new_claim(data)
    .then((res) => {
      if (res.status == constant.status_code.success) {
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
.wallet {
  min-height: 100%;
  .withdraw {
    margin-top: 1rem;
    .btn-withdraw {
      margin: 1rem;
    }
  }

  .withdraw-list {
    padding-bottom: 1.28205rem;
    .withdraw-item {
      padding: 0.15rem 0.3rem;
      ::v-deep .van-cell {
        border-radius: 0.3rem;
      }
    }
  }
}
</style>
