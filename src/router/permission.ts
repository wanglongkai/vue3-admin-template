import router from "@/router"
import { getToken } from '@/utils/tools'

const whiteList = ['/login']; // 白名单路由，不需要鉴权
router.beforeEach(async to => {
  if(getToken()){
    if(to.path === '/login'){
      // 如果已经登录，并准备进入 Login 页面，则重定向到主页
      return '/'
    }
  }else{
    if(whiteList.includes(to.path)){
      return true;
    }
    return '/login'
  }
})