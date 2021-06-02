import axios from '@/libs/api.request'
export const login = ({ userName, password }) => {
  const data = {
    account: userName,
    password: password
  }
  return axios.request({
    url: '/user/login',
    data: data,
    method: 'post'
  })
}
export const getUserInfo = (token) => {
  const data = {
    header: {
      token
    },
    body: {
      method: 'visit/user/userinfoByToken'
    }
  }
  return axios.request({
    url: '/user/getData',
    data,
    method: 'post'
  })
}
export const logout = (token) => {
  return axios.request({
    url: '/user/logout',
    params: {
      token
    },
    method: 'get'
  })
}

export const find4AutoComplete = (username) => {
  return axios.request({
    url: '/user/getData',
    data: {
      body: {
        max_results: 50,
        username: username,
        method: 'visit/user/getUsers',
        metrics: 'id,name'
      }

    },
    method: 'post'
  })
}
export const updatepassword = (oldpass, newpass, token) => {
      return axios.request({
        url: '/user/getData',
        data: {
          header: {
            token: token
          },
          body: {
            method: 'exec/user/alterPass',
            params: {
              old: oldpass,
              new: newpass
            }
          }
        },
        method: 'post'
      })
    }
    export const findPass = (account) => {
      return axios.request({
        url: '/user/getData',
        data: {
          body: {
            method: 'exec/user/forgetPass',
            metrics: account
          }
        },
        method: 'post'
      })
    }