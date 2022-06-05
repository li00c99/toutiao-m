import axios from 'axios'
// 引入store 
import store from '@/store'

// 设置请求根路径
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/',
})

// 设置拦截器
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config：本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization  = `Bearer ${user.token}`
  }

  // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  return Promise.reject(error)
})

export default request