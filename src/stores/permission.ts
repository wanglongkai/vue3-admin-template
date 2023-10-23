import { ref } from "vue"
import { defineStore } from "pinia"
import { type RouteRecordRaw } from "vue-router"
import { constantRoutes, asyncRoutes } from "@/router"
import asyncRouteSettings from "@/config/async-route"

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  const routeRoles = route.meta?.roles as any[];
  return routeRoles ? roles.some((role) => routeRoles.includes(role)) : true
}

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tempRoute = { ...route }
    if (hasPermission(roles, tempRoute)) {
      if (tempRoute.children) {
        tempRoute.children = filterAsyncRoutes(tempRoute.children, roles)
      }
      res.push(tempRoute)
    }
  })
  return res
}

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])

  const setRoutes = (roles: string[]) => {
    const accessedRoutes = asyncRouteSettings.open ? filterAsyncRoutes(asyncRoutes, roles) : asyncRoutes
    routes.value = constantRoutes.concat(accessedRoutes)
    console.log(`output->routes`,routes)
    dynamicRoutes.value = accessedRoutes
  }

  return { routes, dynamicRoutes, setRoutes }
})
