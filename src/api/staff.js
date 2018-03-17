import instance from '@/utils/fetch'

// 添加保存员工
export function addStaff(obj) {
  return instance.post(`/apiservice/a/sys/user/saveData`, obj)
}
// 编辑保存员工
export function upStaff(obj) {
  return instance.post(`/apiservice/a/sys/user/upData`, obj)
}
// 编辑员工
export function hanleUpuser(obj) {
  return instance.post(`/apiservice/a/sys/user/formData`, obj)
}
// 获取岗位列表（分页）
export function getStationPage(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/sys/role/listPageData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 获取岗位列表（不分页）
export function getStation(obj) {
  return instance.post(`/apiservice/a/sys/role/listDataWithoutPermission`, obj)
}
// 获取员工列表（分页）
export function getStaff(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/sys/user/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 添加岗位
export function addStation(obj) {
  return instance.post(`/apiservice/a/sys/role/saveData`, obj)
}
// 编辑岗位
export function upStation(obj) {
  return instance.post(`/apiservice/a/sys/role/upData`, obj)
}
// 删除岗位
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
  return instance.post(`/apiservice/a/sys/organization/listDataAll`, obj)
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
// 岗位新增时重名检测
// export function chkName(obj) {
//   return instance.get(`/apiservice/a/sys/role/chkName?name=` + obj.name)
// }
export function chkName(obj) {
  return instance.get(`/apiservice/a/sys/role/chkName?id=` + obj.id + '&name=' + obj.name)
}
// 岗位编辑时重名检测

// export function chkNameUp(obj) {
//   return instance.get(`/apiservice/a/sys/role/chkNameUpdate?name=` + obj.name + '&roleId=' + obj.roleId)
// }
export function chkNameUp(obj) {
  return instance.get(`/apiservice/a/sys/role/chkNameUpdate?id=` + obj.id + '&name=' + obj.name + '&roleId=' + obj.roleId)
}

