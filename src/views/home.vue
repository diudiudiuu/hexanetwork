<template>
  <div class="home">
    <div class="mint">
      <div class="hexa-info">
        <van-row>
          <div>
            <van-image width="1rem" height="1rem" round :src="setinterval" />
          </div>
          <div class="amount">
            <h2>{{active_balance.toFixed(4)}}</h2>
            <h3>+{{speed.toFixed(4)}} HEXA / hourly</h3>
          </div>
        </van-row>
      </div>
      <div class="btn-mint">
        <van-button
          v-if="downtime > 0"
          round
          block
          color="linear-gradient(to right, #fcee54, #f3b43e)"
        >
          <van-count-down :time="downtime" />
        </van-button>
        <van-button
          v-else
          round
          block
          color="linear-gradient(to right, #fcee54, #f3b43e)"
          @click="handleMining"
        >MINING</van-button>
      </div>
    </div>
    <div class="booty" v-if="downtime > 0">
      <div class="booty-config">
        <van-form>
          <van-cell-group inset>
            <van-field name="switch" input-align="right" label="Loop">
              <template #input>
                <van-switch v-model="looped" />
              </template>
            </van-field>
          </van-cell-group>
        </van-form>
      </div>
      <div class="btn-booty">
        <van-button round block color="#d4339c" plain @click="handleBoost">BOOST 2X</van-button>
      </div>
      <van-cell
        v-for="item in logs"
        :key="item"
        :title="`Request ${item.times} time`"
        :value="item.status"
        :label="`Spend ${item.timeing}ms`"
      />
    </div>
  </div>
</template>
<script setup name="home">
import { ref } from 'vue'
import { Notify } from 'vant'
import moment from 'moment'

import api from '@/api'

import { useConstantStore } from '@/pinia/constant'
import { useVariableStore } from '@/pinia/variable'

import setinterval from '@/assets/img/setinterval.gif'

const constant = useConstantStore()
const variable = useVariableStore()

const downtime = ref(0)
const handleMining = () => {
  api.transactions
    .mining()
    .then((res) => {
      if (res.status == constant.status_code.success) {
        variable.user = res.user
        start()
      } else {
        Notify({
          message: res.message,
          type: 'danger',
        })
      }
    })
    .catch(() => {})
}

const looped = ref(false)
const times = ref(1)
const logs = ref([])

const hexaBoost = async () => {
  const start = new Date().getTime()
  let status = 'pedding'
  await api.transactions
    .boost()
    .then((res) => {
      if (res.status == constant.status_code.success) {
        variable.user = res.user
        status = 'success'
      } else {
        Notify({
          message: res.message,
          type: 'danger',
        })
        looped.value = false
        status = 'fail'
      }
    })
    .catch(() => {
      looped.value = false
      status = 'error'
    })
  // logs
  const end = new Date().getTime()
  const item = {
    times: times.value,
    timeing: end - start,
    status,
  }
  logs.value.unshift(item)
  if (logs.value.length > 3) {
    logs.value.pop()
  }
  times.value++
}

const handleBoost = async () => {
  if (looped.value) {
    // always
    await hexaBoost()
    handleBoost()
  } else {
    // once
    await hexaBoost()
  }
}

// cale amount

const intervals = ref([])
const current_balance = ref(null)
const active_timeline_item = ref(null)
const balance = ref(0)
const active_balance = ref(0)
const speed = ref(0)

const balanceCalculate = () => {
  const activeTimelineItem = getActiveTimelineItem()
  if (activeTimelineItem) {
    const r = (new Date().getTime() - activeTimelineItem.timestamp) / 1000
    speed.value = 60 * activeTimelineItem.increase_per_second * 60

    active_balance.value =
      current_balance.value + r * activeTimelineItem.increase_per_second
  }
}
const getActiveTimelineItem = () => {
  let timelineData = null
  if (variable.user.timelineData && variable.user.timelineData.length > 0) {
    timelineData = variable.user.timelineData.sort((a, b) => {
      return a.timestamp - b.timestamp
    })
    timelineData = timelineData.filter((item) => {
      return item.timestamp < new Date().getTime()
    })
    if (timelineData.length) {
      timelineData = timelineData[timelineData.length - 1]
    }
  }
  return timelineData
}

const setActiveTimelineItem = () => {
  balance.value = variable.user.balanceData
  const activeTimelineItem = getActiveTimelineItem()
  if (activeTimelineItem) {
    active_timeline_item.value = activeTimelineItem
    current_balance.value = balance.value + activeTimelineItem.initial_balance
  } else {
    active_timeline_item.value = null
    current_balance.value = balance.value
  }
  balanceCalculate()
}

const start = () => {
  downtime.value =
    new Date(variable.user.last_activity_time).getTime() -
    new Date(moment().utc()).getTime()
  for (const item of intervals.value) {
    clearInterval(item)
  }
  intervals.value.push(setInterval(setActiveTimelineItem, 1000))
}
start()
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow: hidden;
  .mint {
    margin-top: 1rem;
    .hexa-info {
      margin: 1rem;
      ::v-deep .van-row {
        background: #2a2a3b;
        color: #fff;
        padding: 0.3rem 0.5rem;
        border-radius: 0.5rem;
      }

      .amount {
        text-align: left;
        margin-left: 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    .btn-mint {
      margin: 1rem 2rem;
    }
  }
  .booty {
    margin-top: 2rem;
    .booty-config {
      margin: 1rem;
    }
    .btn-booty {
      margin: 1rem 2rem;
    }
  }
}
</style>
