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
//   // console.log(config,'请求')
//   // for (var i in config.data) {
//   //   console.log(config.data[i], '拦截之前----------------')
//   //   // config.data[i] = encodeURI(config.data[i])
//   //   console.log(config.data[i], '拦截之后----------------')
//   // }
//   return config
// }, error => {
//   console.log(error)
//   return Promise.reject(error)
// })

// 拦截响应
instance.interceptors.response.use(res => {
  // console.log(res.status, '响应')
  // console.log(res.data, '响应code')
  if (res.data.code !== undefined) {
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
    if (res.data.code === 0) {
      if (typeof res.data.data === 'string') {
        Message.error(res.data.data)
      } else {
        Message.error(res.data.data[0])
      }
    }
  }

  return res
}, error => {
  if (error.response) {
    const num = error.response.status
    if ([502, 503, 504].indexOf(num) > -1) {
      arr.push(error.response.status)
      //console.log(arr.length)
      if (arr.length === 1) {
        Message.error('服务器断开！')
      }
    }
  } else {
    arr.push(error)
    // console.log(arr)
    // console.log(error.code)
    if (error.code === 'ECONNABORTED') {
      if (arr.length === 1) {
        Message.error('请求超时')
      }
    } else {
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
  }
  return Promise.reject(error)
})

export default instance
