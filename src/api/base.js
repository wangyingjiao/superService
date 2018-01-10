import instance from '@/utils/fetch'

// 获取机构
export function getMech() {
  return instance.get(`/apiservice/a/sys/office/listData`)
}

// 获取服务城市
export function getCity() {
  return instance.get(`/apiservice/a/sys/area/listData1`)
}
// 获取服务站
export function getSite(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/station/serviceStation/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 新增服务站
export function addSite(obj) {
  return instance.post(`/apiservice/a/service/station/serviceStation/saveData`, obj)
}
// 编辑保存服务站
export function upSite(obj) {
  return instance.post(`/apiservice/a/service/station/serviceStation/upData`, obj)
}
// 删除服务站
export function delSite(obj) {
  return instance.post(`/apiservice/a/service/station/serviceStation/deleteStation`, obj)
}
// 获取站长列表
export function getMaster(obj) {
  return instance.post(`/apiservice/a/service/station/serviceStation/getManager`, obj)
}
// 设置站长
export function setMaster(obj) {
  return instance.post(`/apiservice/a/service/station/serviceStation/setManager`, obj)
}

// 当前机构的服务城市
// export function getOffcity(obj) {
//   return instance.post(`/apiservice/a/sys/office/officeServerCity`, obj)
// }
//  修改后
// 获取机构带分页
export function getMechPage(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/sys/organization/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 新增机构
export function addMech(obj) {
  return instance.post(`/apiservice/a/sys/organization/saveData`, obj)
}
// 编辑时机构信息
export function setMech(obj) {
  return instance.post(`/apiservice/a/sys/organization/formData`, obj)
}
// 编辑保存机构
export function upMech(obj) {
  return instance.post(`/apiservice/a/sys/organization/upData`, obj)
}
// 获取门店列表
export function getStore(obj) {
  return instance.post(`/apiservice/a/service/station/serviceStation/getStoreList`, obj)
}
// 获取门店列表
export function setStore(obj) {
  return instance.post(`/apiservice/a/service/station/serviceStation/saveStationStore`, obj)
}
// 设置服务站范围
export function setScope(obj) {
  return instance.post(`/apiservice/a/service/station/serviceStation/setScope`, obj)
}
