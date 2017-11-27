import axios from 'axios'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})

export function addStaff(obj) {
  return instance.post(`/api/a/sys/user/saveData`, obj)
}

export function getStation() {
  return instance.get(`/api/a/sys/role/listData?pageSize=-1`)
}
export function getStaff(obj) {
  return instance.post(`/api/a/sys/user/listData?orderBy=update_date`, obj)
}
export function addStation(obj) {
  return instance.post(`/api/a/sys/role/saveData`, obj)
}
export function delStation(obj) {
  return instance.post(`/api/a/sys/role/deleteRole`, obj)
}
export function searchStation(obj) {
  return instance.post(`/api/a/sys/role/search`, obj)
}
export function getPower(str) {
  return instance.get(`/api/a/sys/role/getRoleDetail?id=` + str)
}
// 获取机构列表
export function getSList(obj) {
  return instance.post(`/api/a/sys/office/listData`, obj)
}

// export function addMana(obj) {
//   return instance.post(`/api//a/sys/office/saveData`, obj)
// }
