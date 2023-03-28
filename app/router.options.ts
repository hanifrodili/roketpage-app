import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  routes: (_routes) => [
    {
      name: 'company',
      path: '/company',
      component: () => import('~/pages/app/company.vue'),
    },
    {
      name: 'coupon',
      path: '/coupon',
      component: () => import('~/pages/app/coupon.vue'),
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: () => import('~/pages/app/dashboard.vue'),
    },
    {
      name: 'order',
      path: '/order',
      component: () => import('~/pages/app/order.vue'),
    },
    {
      name: 'product',
      path: '/product',
      component: () => import('~/pages/app/product.vue'),
    },
    {
      name: 'settings',
      path: '/settings',
      component: () => import('~/pages/app/settings.vue'),
    },
    {
      name: 'sites',
      path: '/sites',
      component: () => import('~/pages/app/sites/index.vue'),
    },
    {
      name: 'sitesBuilder',
      path: '/sites/builder/:id',
      component: () => import('~/pages/app/sites/builder/[id].vue'),
    },
    {
      name: 'signin',
      path: '/signin',
      component: () => import('~/pages/signin.vue'),
    },
    {
      name: 'signup',
      path: '/signup',
      component: () => import('~/pages/signup.vue'),
    },
    {
      name: 'forgot',
      path: '/forgot',
      component: () => import('~/pages/forgot.vue'),
    },
    {
      name: 'reset',
      path: '/reset',
      component: () => import('~/pages/reset.vue'),
    },
    {
      name: 'index',
      path: '/index',
      component: () => import('~/pages/index.vue'),
    },
    {
      name: 'store',
      path: '/teststore',
      component: () => import('~/pages/store.vue'),
    },
  ],
}