import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/middleware/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('../views/SignIn.vue'),
      meta: {
        layout: 'GuestLayout',
      }
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
      path: '/home',
      component: () => import('@/views/Home.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/sign',
      name: 'Home',
      component: () => import('@/views/Sign/index.vue'),
      meta: {
        layout: 'AppLayoutDefault',
        middleware: [auth]
      }
    },
    {
      path: '/sign/sign-own',
      component: () => import('@/views/Sign/SignOwn.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/sign/verify-document',
      component: () => import('@/views/Sign/VerifyDocument.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/sign/send-sign',
      component: () => import('@/views/Sign/SendSign.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/dashboard',
      component: () => import('@/views/Dashboard/index.vue'),
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
      path: '/signed-document',
      component: () => import('@/views/ViewSignedDocument/index.vue'),
      meta: { layout: 'GuestLayout' }
    },
    {
      path: '/thanks-for-signing',
      component: () => import('@/views/ThanksForSigning.vue'),
      meta: { layout: 'GuestLayout' }
    },
    {
      path: '/action-center',
      component: () => import('@/views/ActionCenter.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/my-signature',
      component: () => import('@/views/MySignature.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/change-password',
      component: () => import('@/views/ChangePassword.vue'),
      meta: { layout: 'AppLayoutDefault' }
    },
    {
      path: '/',
      component: () => import('@/views/ConnectWallet.vue'),
      meta: { layout: 'GuestLayout' }
    }
  ]
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router
