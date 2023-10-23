import CacheKey from "@/constants/cache-key"
import { type SidebarOpened, type SidebarClosed } from "@/constants/app-key"

export const getSidebarStatus = () => {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}
export const setSidebarStatus = (sidebarStatus: SidebarOpened | SidebarClosed) => {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}