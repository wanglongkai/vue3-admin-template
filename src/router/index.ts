import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router"

const Layout = () => import("@/layout/index.vue")

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('~/views/login/login.vue')
  },
  {
    path: '/404',
    component: () => import('~/views/404.vue'),
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/home.vue"),
        name: "Home",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          roles: ["admin", "editor"], // 可以在根路由中设置角色
        }
      }
    ]
  },
  {
    path: "/menu",
    component: Layout,
    redirect: "/menu/menu1",
    name: "Menu",
    meta: {
      title: "多级菜单",
      svgIcon: "menu"
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/folder/index.vue"),
        redirect: "/menu/menu1/menu1-1",
        name: "Menu1",
        meta: {
          title: "menu1"
        },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/folder1/index.vue"),
            name: "Menu1-1",
            meta: {
              title: "menu1-1"
            }
          },
          {
            path: "menu1-2",
            component: () => import("@/views/folder4/index.vue"),
            redirect: "/menu/menu1/menu1-2/menu1-2-1",
            name: "Menu1-2",
            meta: {
              title: "menu1-2"
            },
            children: [
              {
                path: "menu1-2-1",
                component: () => import("@/views/folder3/index.vue"),
                name: "Menu1-2-1",
                meta: {
                  title: "menu1-2-1"
                }
              },
            ]
          }
        ]
      },
      {
        path: "menu2",
        component: () => import("@/views/folder5/index.vue"),
        name: "Menu2",
        meta: {
          title: "menu2"
        }
      }
    ]
  },
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = []

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})



export default router
