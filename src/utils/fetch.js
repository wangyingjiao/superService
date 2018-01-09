import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const instance = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000,                 // 请求超时时间
  headers: { 'content-type': 'application/json;charset=UTF-8' }
})
// instance.interceptors.request.use(config => {
//   for (var i in config.data) {
//     console.log(encodeURI(config.data[i]), '拦截器----------------')
//     config.data[i] = encodeURI(config.data[i])
//   }
//   // console.log(config.data,'拦截器输出的值')
//   return config
// }, error => {
//   console.log(error)
// })
export default instance
