import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('~/views/home/home.vue')
    },
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
})

export default router
