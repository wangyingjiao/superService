import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
const instance = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  // timeout: 15000,                 // 请求超时时间
  headers: { 'content-type': 'application/json;charset=UTF-8' }
})
// 拦截请求
// instance.interceptors.request.use(config => {
//   for (var i in config.data) {
//     console.log(config.data[i], '拦截之前----------------')
//     // config.data[i] = encodeURI(config.data[i])
//     console.log(config.data[i], '拦截之后----------------')
//   }
//   return config
// }, error => {
//   return Promise.reject(error)
// })

// 拦截响应
instance.interceptors.response.use(data => {
  // console.log(data, '响应')
  return data
}, error => {
  // console.log(error, '响应错误')
  // Message.error({
  //   message: '加载失败'
  // })
  return Promise.reject(error)
})
export default instance
