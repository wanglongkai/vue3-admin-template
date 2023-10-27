import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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

  const router = useRouter()
  const logout = async () => {
    localStorage.clear();
    router.replace("/login")
  }

  return {
    userInfo,
    setUserInfo,
    getUserInfo,
    logout
  }
})