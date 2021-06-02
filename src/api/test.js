import axios from "axios"

export const add = (userName, age) => {
  return axios.request({
    url: '/test/add',
    method: 'post',
    data: {userName,age}
  })
}