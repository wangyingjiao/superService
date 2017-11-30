import axios from 'axios'

let instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
// 获取机构
export function getMech() {
  return instance.get(`/api/a/sys/office/listData`)
}
// 获取机构带分页
export function getMechPage(obj, pageNumber, pageSize) {
  return instance.post(`/api/a/sys/office/pageData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
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
// 服务范围类型
export function getArea(id) {
  return instance.get(`/api/a/sys/area/getchildArea?id=`+id)
}
// 获取服务城市
export function getCity() {
  return instance.post(`/api/a/sys/area/treeArea`)
}
