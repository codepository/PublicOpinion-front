import axios from '@/libs/api.request'
export const find = (params) => {
  return axios.request({
    url: '/opinion/find',
    method: 'POST',
    data: params
  })
}
export const add = (params) => {
  return axios.request({
    url: '/opinion/add',
    method: 'POST',
    data: params
  })
}

export const update = (params) => {
  return axios.request({
    url: '/opinion/update',
    method: 'POST',
    data: params
  })
}

export const del = (ids) => {
  return axios.request({
    url: '/opinion/delete?id='+ids,
    method: 'GET'
  })
}