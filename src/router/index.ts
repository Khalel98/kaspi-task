import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/DefaultView.vue'),
    redirect: '/feed',
    children: [
      {
        path: 'feed',
        name: 'feed',
        component: () => import('@/pages/main/MainPage.vue'),
        meta: {
          requiresAuth: true,
          title: 'Feed',
          backLink: '/login',
          backTitle: 'Back',
          forwardTitle: 'Filter'
        }
      },
      {
        path: '/post/:id',
        name: 'content',
        component: () => import('@/pages/content/ContentPage.vue'),
        meta: {
          requiresAuth: true,
          title: 'Content',
          backLink: '/feed',
          backTitle: 'Back',
          forwardTitle: 'Filter'
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/pages/profile/ProfilePage.vue'),
        meta: {
          requiresAuth: true,
          profile: true,
          title: 'Profile',
          backTitle: 'Setting',
          forwardTitle: 'Logout'
        }
      },
      {
        path: 'market',
        name: 'market',
        component: () => import('@/pages/market/MarketPage.vue'),
        meta: { requiresAuth: true, title: 'Market' }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/general/GeneralView.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/auth/LoginView.vue'),
        meta: {
          title: 'Log In',
          forwardLink: '/sign-up',
          forwardTitle: 'Sign Up'
        }
      },
      {
        path: 'sign-up',
        name: 'sign-up',
        component: () => import('@/pages/auth/SignUpView.vue'),
        meta: { title: 'Sign Up', forwardLink: '/login', forwardTitle: 'Log In' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authStore.token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
