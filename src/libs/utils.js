import Cookies from 'js-cookie'
import config from '@/config'
const { cookieExpires } = config
export const TOKEN_KEY = 'token'
export const  setToken = (token) => {
      Cookies.set(TOKEN_KEY,token, {expires: cookieExpires || 1})
}
export const getToken = () => {
      const token = Cookies.get(TOKEN_KEY)
      if (token) return token
      else return false
}
/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
      return targetarr.some(_ => arr.indexOf(_) > -1)
    }
/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
      if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
      else return true
    }
/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
      const routePermissionJudge = (list) => {
            return list.some(item => {
              if (item.children && item.children.length) {
                return routePermissionJudge(item.children)
              } else if (item.name === name) {
                return hasAccess(access, item)
              }
            })
          }
        
          return routePermissionJudge(routes)
}
