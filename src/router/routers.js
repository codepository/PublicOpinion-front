export default [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/view/home.vue')
      },
      {
        path: '/login',
        name: 'login',
        meta: {
          title: '登录',
        },
        component: () => import('@/view/login/login.vue')
      }
    ]