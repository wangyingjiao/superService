import axios from 'axios'

let instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
// 获取机构
export function getMech() {
  return instance.get(`/api/a/sys/office/listData`)
}
// 新增机构
export function addMech(obj) {
  return instance.post(`/api/a/sys/office/saveData`, obj)
}
// 服务范围类型
export function getSerarea() {
  return instance.get(`/api/a/sys/dict/listData?type=service_area_type`)
}
// 服务范围类型
export function getSerstation() {
  return instance.get(`/api/a/sys/dict/listData?type=service_area_type`)
}
