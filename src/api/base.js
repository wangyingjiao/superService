import axios from 'axios'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
// 获取机构
export function getMech() {
  return instance.get(`/api/a/sys/office/listData`)
}

export function getSerstation() {
  return instance.get(`/api/a/sys/dict/listData?type=service_area_type`)
}

// 获取服务城市
export function getCity() {
  return instance.get(`/api/a/sys/area/listData1`)
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
export function delSite(obj) {
  return instance.post(`/api/a/service/station/serviceStation/deleteStation`, obj)
}
// 获取站长列表
export function getMaster(obj) {
  return instance.post(`/api/a/sys/user/listData?pageSize=-1`, obj)
}
// 设置站长
export function setMaster(obj) {
  return instance.post(`/api/a/service/station/serviceStation/setManager`, obj)
}
// 字典量 获取服务站类型
export function getType() {
  return instance.post(`/api/a/sys/dict/listData?type=service_station_type`)
}
// 当前机构的服务城市
export function getOffcity(obj) {
  return instance.post(`/api/a/sys/office/officeServerCity`, obj)
}
//  修改后
// 获取机构带分页
export function getMechPage(obj, pageNumber, pageSize) {
  return instance.post(`/api/a/sys/organization/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 新增机构
export function addMech(obj) {
  return instance.post(`/api/a/sys/organization/saveData`, obj)
}
// 编辑机构
export function upMech(obj) {
  return instance.post(`/api/a/sys/organization/formData`, obj)
}
// 获取门店列表
export function getStore(obj) {
  return instance.post(`/api/a/service/station/serviceStation/getStoreList`, obj)
}
// 获取门店列表
export function setStore(obj) {
  return instance.post(`/api/a/service/station/serviceStation/saveStationStore`, obj)
}
