import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import store from '@/store'
import { setToken, getToken, canTurnTo } from '@/libs/utils'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const LOGIN_PAGE_NAME = 'login'
const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}
router.beforeEach((to, from, next) => {
  const token = getToken()
  // 找回密码
  if (to.name === 'findPass') {
    next()
  } else if (to.name === LOGIN_PAGE_NAME) {
    next()
  } else if (!token) {
    // 跳转到登陆页面
    next({
      name: LOGIN_PAGE_NAME
    })
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access,next)
    } else {
      store.dispatch('getUserInfo').then(user => {
        turnTo(to, user.access,next)
      }).catch(() => {
        setToken('')
        next({
          name:'login'
        })
      })
    }
  }
})
export default router
