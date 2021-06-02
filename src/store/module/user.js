import {
      login,
      logout,
      getUserInfo
} from '@/api/user'
import { setToken, getToken } from '@/libs/utils'
export default {
      state: {
            userName: '',
            uid: 0,
            // 微信id
            userId: '',
            avatar: '',
            token: getToken(),
            phone: '',
            // 用户角色
            roles: [],
            access: '',
            hasGetInfo: false,
      },
      mutations: {
            setAvatar (state, avatar) {
                  state.avatar = avatar
            },
            setUid (state, uid){
                  state.uid = uid
            },
            setUserId (state, userId) {
                  state.userId = userId
            },
            setUserName (state, name) {
                  state.userName = name
            },
            setPhone (state, phone) {
                  state.phone = phone
            },
            setAccess (state, access) {
                  state.access = access
            },
            setToken (state, token) {
                  state.token = token
                  setToken(token)
            },
            setRoles (state, roles) {
                  state.roles = roles
            },
            setHasGetInfo (state, status) {
                  state.hasGetInfo = status
            }
      },
      actions: {
            // 登陆
            handleLogin ( { commit }, { userName, password }) {
                  userName = userName.trim()
                  return new Promise((resolve, reject) => {
                        login({ userName, password}).then(res => {
                              if (res.data.status === 200) {
                                    const data = res.data.message.body.data
                                    commit('setToken', res.data.message.header.token)
                                    commit('setAvatar', data[0].avatar)
                                    commit('setUserName', data[0].name)
                                    commit('setPhone', data[0].mobile)
                                    commit('setUid', data[0].id)
                                    commit('setUserId', data[0].userid)
                                    if (data[1] !== null) {
                                      commit('setRoles', data[1].map((l) => l.tagName))
                                      commit('setAccess', data[1].map((l) => l.tagName))
                                    }
                                    commit('setHasGetInfo', true)
                                    // 以下为自定义
                                    resolve(data)
                                  } else {
                                    alert(res.data.message)
                                  }
                        }).catch(err => {
                              reject(err)
                        })
                  })
            },
            // 退出登录
            handleLogOut ({ state, commit }) {
                  return new Promise((resolve, reject) => {
                  logout(state.token).then(res => {
                  if (res.data.ok) {
                        commit('setToken', '')
                        commit('setRoles', [])
                        commit('setAccess', [])
                        resolve()
                  }
                  }).catch(err => {
                  reject(err)
                  })
                  })
            },
            // 获取用户相关信息
            getUserInfo ({ state, commit }) {
                  return new Promise((resolve, reject) => {
                  try {
                  // 获取用户信息
                  getUserInfo(state.token).then(res => {
                        if (res.data.status !== 200) {
                              this.$router.push({
                              name: 'login'
                            })
                        } else {
                              const data = res.data.message.body.data
                              commit('setToken', res.data.message.header.token)
                              commit('setAvatar', data[0].avatar)
                              commit('setUserName', data[0].name)
                              commit('setPhone', data[0].mobile)
                              commit('setUid', data[0].id)
                              commit('setUserId', data[0].userid)
                              if (data[1] !== null) {
                                commit('setRoles', data[1].map((l) => l.tagName))
                                commit('setAccess', data[1].map((l) => l.tagName))
                              }
                              commit('setHasGetInfo', true)
                              resolve(data)
                        }
                  }).catch(err => {
                        reject(err)
                  })
                  } catch (error) {
                  reject(error)
                  }
                  })
            }
      }
}