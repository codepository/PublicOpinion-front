import axios from 'axios'
import store from '@/store'
class HttpRequest {
      constructor ( base ) {
            this.baseUrl = base
            this.queue = {}
      }
      getInsideConfig () {
            const config = {
                  baseURL: this.baseUrl,
                  headers: {}
            }
            return config
      }
      destroy (url) {
            delete this.queue[url]
            if (!Object.keys(this.queue).length) {
                  // 
            }
      }
      interceptors (instance, url) {
            // 请求拦截
            instance.interceptors.request.use(config => {
                  this.queue[url] = true
                  config.headers['Content-Type'] = "application/json"
                  config.headers['x-csrf-token']= store.state.user.token
                  return config
            },error => {
                  return Promise.reject(error)
            })
            // 响应拦截
            instance.interceptors.response.use(res => {
                  this.destroy(url)
                  const { data, status } = res
                  return { data, status }
            }, error => {
                  this.destroy(url)
                  let errorInfo = error.response
                  if (!errorInfo) {
                        console.log(errorInfo)
                  }
                  return Promise.reject(error)
            })
      }
      request (options) {
            const instance = axios.create()
            options = Object.assign(this.getInsideConfig(), options)
            this.interceptors(instance, options.url)
            return instance(options)
      }
}
export default HttpRequest