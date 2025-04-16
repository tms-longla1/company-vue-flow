import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Home/index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/pages/Error/index.vue')
    }
  ]
})

export default router
