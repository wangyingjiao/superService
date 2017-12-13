import axios from 'axios'

const qs = require('qs')
const instance = axios.create({
  headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }

})

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return instance.post(`/api/a/login`, qs.stringify(data))
}

export function requestUserRole(username, password) {
  const data = {
    username,
    password
  }
  return instance.post(`/api/a/sys/user/roleData`, qs.stringify(data))
}

export function logout() {  // 退出
  return instance.post(`/api/a/logout`)
}

export function getUserInfo() { // 侧边栏
  return instance.get(`/api/a/sys/user/menuData`)
}

export function getArea() { // 省市区
  return instance.get(`/api/a/sys/area/listData`)
}
export function getButton() { // 按钮
  return instance.get(`/api/a/sys/user/getButtons`)
}
