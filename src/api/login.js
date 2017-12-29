import fetch from '@/utils/fetch'

// export function loginByUsername(data) {
//   const obj = {
//     'username': 'admin',
//     'password': 'admin'
//   }
//   return fetch({
//     url: '/a/login',
//     method: 'post',
//     data
//   })
// }
export function loginByUsername(obj) {
 return fetch.post(`/api/a/login`, obj)
}

// export function requestUserRole(username, password) {
//   const data = {
//     username,
//     password
//   }
//   return instance.post(`/api/a/sys/user/roleData`, qs.stringify(data))
// }

export function logout() {  // 退出
  return instance.post(`/api/a/logout`)
}

export function getUserInfo() { // 侧边栏
  //return instance.get(`/api/a/sys/user/menuData;JSESSIONID=` + getSession('JSESSIONID'))
  return fetch({
    url: '/a/sys/user/menuData',
    method: 'get'
  })
}

export function getArea() { // 省市区
  return instance.get(`/api/a/sys/area/listData`)
}
export function getButton() { // 按钮
  return instance.get(`/api/a/sys/user/getButtons`)
}
