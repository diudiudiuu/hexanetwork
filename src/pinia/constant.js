import { defineStore } from 'pinia'

/**
 * 常量存储
 * 
 */
export const useConstantStore = defineStore({
  id: 'constant',
  state: () => ({
    status_code: {
      success: 200,
    },
    session_time: 1 * 60 * 60 * 1000,
    secret: "secret",
  }),
  getters: {
  },
  actions: {
  },
})