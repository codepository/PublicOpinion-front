import axios from '@/libs/api.request'
export const find = (params)=> {
  return axios.request({
    url: '/opiniontag/find',
    method:'POST',
    data:params
  })
}
export const add = (params)=> {
  return axios.request({
    url:'/opiniontag/add',
    method:'POST',
    data:params
  })
}
export const del = (ids)=>{
  return axios.request({
    url: '/opiniontag/delete?id='+ids,
    method:'GET'
  })
}