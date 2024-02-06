import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('../views/SignIn.vue'),
      meta: { layout: 'GuestLayout' }
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('../views/SignUp.vue'),
      meta: { layout: 'GuestLayout' }
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
    },
    {
      path: '/sign-own',
      component: () => import('@/views/FirstPage.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/third-page',
      component: () => import('@/views/ThirdPage.vue'),
      meta: { layout: 'AppLayoutDefault' }
    }
  ]
})

export default router
