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
]

/**
 * 所有动态路由
 * 根据菜单权限过滤出当前用户可用路由
 */
export const allDynamicRoutes: RouteRecordRaw[] = [
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
        }
      },
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
              {
                path: "menu1-2-2",
                component: () => import("@/views/folder3/index.vue"),
                name: "Menu1-2-2",
                meta: {
                  title: "menu1-2-2"
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
  {
    path: "/structure",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/views/structor/index.vue"),
        name: "Structure",
        meta: {
          title: "响应解构",
          svgIcon: 'lock'
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})



export default router
