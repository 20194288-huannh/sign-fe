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
      path: '/me',
      name: 'Me',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/sign',
      component: () => import('@/views/Sign/index.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/sign/sign-own',
      component: () => import('@/views/FirstPage.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/sign/send-sign',
      component: () => import('@/views/Sign/SendSign.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/documents',
      component: () => import('@/views/Documents.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/change-password',
      component: () => import('@/views/ChangePassword.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/test',
      component: () => import('@/views/Test.vue'),
      meta: { layout: 'AppLayoutDefault' }
    }
  ]
})

export default router
