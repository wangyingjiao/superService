import instance from '@/utils/fetch'

// 订单列表（分页）
export function getOrderTable(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/order/orderInfo/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 按ID获取订单信息
export function getOrderInf(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/formData`, obj)
}
// 更改服务时间
export function ChangeTimeData(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/timeDataList`, obj)
}
// 更换时间保存
export function saveTime(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/saveTime`, obj)
}
// 增加技师
export function addTechData(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/addTech`, obj)
}
// 增加技师保存
export function addTechSave(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/addTechSave`, obj)
}
// 改派技师
export function dispatchTechData(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/dispatchTech`, obj)
}
// 改派技师保存
export function dispatchTechSave(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/dispatchTechSave`, obj)
}
// 改派管理表格数据获取及分页
export function Reassignment(obj, pageNumber, pageSize) {
  return instance.post(`apiservice/a/service/order/orderDispatch/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 根据id获取改派记录
export function reassId(obj) {
  return instance.post(`apiservice/a/service/order/orderDispatch/formData`, obj)
}
// 改派菜单下的改派按钮
export function dispatchTechData1(obj) {
  return instance.post(`apiservice/a/service/order/orderDispatch/dispatchTech`, obj)
}
// 改派菜单下的改派保存
export function dispatchTechSave1(obj) {
  return instance.post(`/apiservice/a/service/order/orderDispatch/dispatchTechSave`, obj)
}
