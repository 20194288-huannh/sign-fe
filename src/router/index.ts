import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      meta: { layout: 'AppLayoutDefault' }
    }
  ]
})

export default router
