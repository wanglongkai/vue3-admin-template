import { reactive, watch, toRefs } from "vue"
import { defineStore } from "pinia"
import { getSidebarStatus, setSidebarStatus } from "@/utils/local-storage"
import { SIDEBAR_OPENED, SIDEBAR_CLOSED } from "@/constants/app-key"
import { getMenuPermissions } from '@/api/user'
import { allRoutes, constantRoutes } from '@/router'
import { type RouteRecordRaw } from 'vue-router';

interface Sidebar {
  opened: boolean
  withoutAnimation: boolean
}

/** 设置侧边栏状态本地缓存 */
function handleSidebarStatus(opened: boolean) {
  opened ? setSidebarStatus(SIDEBAR_OPENED) : setSidebarStatus(SIDEBAR_CLOSED)
}

export const useAppStore = defineStore("app", () => {
  /** 侧边栏状态 */
  const sidebar: Sidebar = reactive({
    opened: getSidebarStatus() !== SIDEBAR_CLOSED,
    withoutAnimation: false
  })
  /** 监听侧边栏 opened 状态 */
  watch(
    () => sidebar.opened,
    (opened) => handleSidebarStatus(opened)
  )
  /** 切换侧边栏 */
  const toggleSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = withoutAnimation
  }
  /** 关闭侧边栏 */
  const closeSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
  }

  const app = reactive({
    routes: [] as RouteRecordRaw[],
  })

  const generateRoutes = async (usrId) => {
    const { data } = await getMenuPermissions(usrId);
    const sidebarRoutes = filterAsyncRouter(allRoutes, data);
    app.routes = constantRoutes.concat(sidebarRoutes);
    return sidebarRoutes;
  }


  return { sidebar, toggleSidebar, closeSidebar, generateRoutes, ...toRefs(app) }
})

function filterAsyncRouter(allRoutes, permissions){
  // todo
  return allRoutes
}
