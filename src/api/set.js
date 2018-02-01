import instance from '@/utils/fetch'

// 获取日志列表
export function getLog(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/log/serviceLog/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}

// 获取对接日志列表
export function getsysLog(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/log/SysJointLogger/listSysJointLogger?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}

// 获取app发版列表
export function getApp(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/appVersion/appVersion/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 新增app发版
export function addApp(obj) {
  return instance.post(`/apiservice/a/service/appVersion/appVersion/saveData`, obj)
}
// app发版编辑
export function handleUpApp(obj) {
  return instance.post(`/apiservice/a/service/appVersion/appVersion/formData`, obj)
}
// app发版编辑保存
export function upApp(obj) {
  return instance.post(`/apiservice/a/service/appVersion/appVersion/upData`, obj)
}
// 删除app发版
export function delApp(obj) {
  return instance.post(`/apiservice/a/service/appVersion/appVersion/deleteAppVersion`, obj)
}
// 获取菜单列表
export function getMenu(obj) {
  return instance.post(`/apiservice/a/sys/menu/getMenuList`, obj)
}
