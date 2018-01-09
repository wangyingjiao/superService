import axios from 'axios'
import { getSession } from '@/utils/auth'
const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }
})
instance.interceptors.request.use(config => {
  for (var i in config.data) {
    console.log(encodeURI(config.data[i]), '拦截器----------------')
    config.data[i] = encodeURI(config.data[i])
  }
  // console.log(config.data,'拦截器输出的值')
  return config
}, error => {
  console.log(error)
})
export function loginByUsername(obj) {
  return instance.post(`/apiservice/a/login`, obj)
}

export function logout() {  // 退出
  return instance.post(`/apiservice/a/logout`)
}

export function getUserInfo() { // 侧边栏
  return instance.get(`/apiservice/a/sys/user/menuData`)
}

export function getArea() { // 省市区
  return instance.get(`/apiservice/a/sys/area/listData`)
}
export function getButton() { // 按钮
  return instance.get(`/apiservice/a/sys/user/getButtons`)
}
