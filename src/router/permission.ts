import router from '@/router'
import { getToken } from '@/utils/tools'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

const whiteList = ['/login'] // 白名单路由，不需要鉴权
router.beforeEach(async (to) => {
  const appStore = useAppStore()
  const userStore = useUserStore()
  if (getToken()) {
    if (to.path === '/login') {
      // 如果已经登录，并准备进入 Login 页面，则重定向到主页
      return '/'
    }
    if (!userStore.userInfo.id) {
      const userId = localStorage.getItem('userId')
      await userStore.getUserInfo(userId)
      const routes = await appStore.generateRoutes(userId)
      routes.forEach((route) => router.addRoute(route))
      return to // 必须重定向一下，不然动态路由无法匹配
    }
  } else {
    if (whiteList.includes(to.path)) {
      return true
    }
    return '/login'
  }
})
