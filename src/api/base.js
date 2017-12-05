import axios from 'axios'

const instance = axios.create({
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
  return instance.get(`/api/a/sys/area/getchildArea?id=` + id)
}
// 获取服务城市
export function getCity() {
  return instance.post(`/api/a/sys/area/treeArea`)
}
// 获取服务站
export function getSite(obj, pageNumber, pageSize) {
  return instance.post(`/api/a/service/station/serviceStation/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 新增服务站
export function addSite(obj) {
  return instance.post(`/api/a/service/station/serviceStation/saveData`, obj)
}
// 删除服务站
export function delSite() {
  return instance.post(`/api/a`)
}
// 获取站长列表
export function getMaster(obj) {
  return instance.post(`/api/a/sys/user/listData?pageSize=-1`, obj)
}
// 字典量 获取服务站类型
export function getType() {
  return instance.post(`/api/a/sys/dict/listData?type=service_station_type`)
}
