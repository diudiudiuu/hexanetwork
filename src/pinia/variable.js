import { defineStore } from 'pinia'

/**
 * 变量存储
 * 注意部分数据初始值需要与常量保持一致
 */

export const useVariableStore = defineStore({
  id: 'variable',
  state: () => ({
    user: {}, // login成功后 用户信息
    timestamp: 0,
    loading: false, // 加载中
    keep_alive: ["wallet", "home", "account"]
  }),
  getters: {
  },
  actions: {
  },
})