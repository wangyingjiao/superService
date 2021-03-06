import instance from '@/utils/fetch'

// 获取日志列表
export function getLog(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/log/serviceLog/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}

// 获取对接日志列表
export function getsysLog(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/log/SysJointLogger/listSysJointLogger?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 再次对接
export function doOpenSend(obj) {
  return instance.post(`/apiservice/a//service/log/SysJointLogger/doOpenSend`, obj)
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
// 获取app地址
export function getNewest(obj) {
  return instance.post(`/apiservice/a/service/appVersion/appVersion/getNewest`, obj)
}
// 获取菜单列表
export function getMenu(obj) {
  return instance.post(`/apiservice/a/sys/menu/getAllMenuList`, obj)
}
// 新增保存菜单
export function addMenu(obj) {
  return instance.post(`/apiservice/a/sys/menu/save`, obj)
}
// 编辑菜单
export function handleUpMenu(obj) {
  return instance.post(`/apiservice/a/sys/menu/formData`, obj)
}
// 编辑保存菜单
export function upMenu(obj) {
  return instance.post(`/apiservice/a/sys/menu/upData`, obj)
}
// 删除菜单
export function delMenu(obj) {
  return instance.post(`/apiservice/a/sys/menu/delete`, obj)
}

// 推送失败消息列表
export function getPushMes(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/sys/pushMessage/listFailData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 重新推送
export function sendPushMes(obj) {
  return instance.post(`/apiservice/a/sys/pushMessage/pushFailMessage`, obj)
}
// 获取字典列表
export function getDict(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/sys/dict/dictListData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 查看字典详情
export function readDict(obj) {
  return instance.post(`/apiservice/a/sys/dict/dictListDataByType`, obj)
}
// 新增字典
export function addDict(obj) {
  return instance.post(`/apiservice/a/sys/dict/saveData`, obj)
}
// 删除字典
export function delDict(obj) {
  return instance.post(`/apiservice/a/sys/dict/deleteDict`, obj)
}
// 获取队列列表
export function getSysjoint(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/log/sysJointWait/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 验证redis密码
export function checkPassword(obj) {
  return instance.post(`/apiservice/a/sys/redis/checkPassword   `, obj)
}
// 设置redis
export function saveRedisValue(obj) {
  return instance.post(`/apiservice/a/sys/redis/saveRedisValue`, obj)
}
// 查询redis
export function getRedisValue(obj) {
  return instance.post(`/apiservice/a/sys/redis/getRedisValue`, obj)
}
