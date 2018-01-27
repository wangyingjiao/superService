import axios from 'axios'
import router from '../router'
import store from '../store'
import { Message } from 'element-ui'
// 创建axios实例
const instance = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000,                 // 请求超时时间
  headers: { 'content-type': 'application/json;charset=UTF-8' }
})
var arr = []
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
instance.interceptors.response.use(res => {
  console.log(res.data.code,'22222222222222222')
  if (res.data.code === 2) {
    arr.push(res.data.code)
    if (arr.length === 1) {
      store.dispatch('LogOut').then(() => {
        Message.error('当前登录已过期,请重新登录,3秒后回到登录页面')
        setTimeout(() => {
          arr = []
          store.state.app.visitedViews = []
          router.push({ path: '/login' })
        }, 2500)
      })
    }
  }
  return res
}, error => {
  // console.log(error, '请求错误')
  // const errorStatus = error.response.status
  // console.log(errorStatus, '响应错误')
  // switch (errorStatus) {
  //   case 404:
  //     console.log('请求路径找不到', '接口404')
  //     break
  //   case 400:
  //     console.log('请求参数错误', '接口400')
  //     break
  //   case 500:
  //     console.log('服务器未响应', '接口500')
  //     break
  //   case 502:
  //     console.log('502', '接口502')
  //     break
  //   case 504:
  //     console.log('服务器断开', '接口504')
  //     break
  //   default:
  //     console.log(errorStatus, '其他错误')
  // }
  return Promise.reject(error)
})

export default instance
