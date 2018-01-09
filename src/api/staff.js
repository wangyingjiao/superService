import axios from 'axios'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }
})
// 拦截器防止中文乱码
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
// 添加员工
export function addStaff(obj) {
  return instance.post(`/apiservice/a/sys/user/saveData`, obj)
}
// 获取岗位列表（分页）
export function getStationPage(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/sys/role/listPageData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 获取岗位列表（不分页）
export function getStation(obj) {
  return instance.post(`/apiservice/a/sys/role/listData`, obj)
}
// 获取员工列表（分页）
export function getStaff(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/sys/user/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 添加岗位
export function addStation(obj) {
  return instance.post(`/apiservice/a/sys/role/saveData`, obj)
}
export function delStation(obj) {
  return instance.post(`/apiservice/a/sys/role/deleteRole`, obj)
}
// export function searchStation(obj) {
//   return instance.post(`/apiservice/a/sys/role/search`, obj)
// }
export function getPower(str) {
  return instance.get(`/apiservice/a/sys/role/getRoleDetail?id=` + str)
}
// 获取机构列表
export function getSList(obj) {
  return instance.post(`/apiservice/a/sys/organization/listData?pageSize=-1`, obj)
}
// 根据id获取服务站
export function getFuwu(obj) {
  return instance.post(`/apiservice/a/service/station/serviceStation/listByOffice`, obj)
}
// 获取menudata
// export function getMenudata() {
//   return instance.get(`/apiservice/a/sys/user/menuData`)
// }
export function getMenudata() {
  return instance.get(`/apiservice/a/sys/menu/getMenuList`)
}
// 删除员工
export function delStaff(obj) {
  return instance.post(`/apiservice/a/sys/user/deleteUser`, obj)
}
export function chkName(name) { // 岗位重名检测
  return instance.get(`/apiservice/a/sys/role/chkName?name=` + name)
}

// 改派管理分页
export function Reassignment(page, size, obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/order/orderDispatch/listData?pageNo=${page}&pageSize=${size}`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 根据id获取改派记录
export function reassId(obj) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/order/orderDispatch/formData`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}
