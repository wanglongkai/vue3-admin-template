import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo as queryUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<any>({});

  const setUserInfo = info => {
    userInfo.value = info
  }

  const getUserInfo = async userId => {
    const info = await queryUserInfo(userId);
    setUserInfo(info.data);
    return info;
  }

  return {
    userInfo,
    setUserInfo,
    getUserInfo
  }
})