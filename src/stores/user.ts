import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<any>({});

  const setUserInfo = info => {
    userInfo.value = info
  }

  return {
    userInfo,
    setUserInfo
  }
})