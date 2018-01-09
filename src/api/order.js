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
  return instance.post(`/apiservice/a/service/order/orderInfo/timeData`, obj)
}
// 更换时间保存
export function saveTime(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/saveTime`, obj)
}
//增加技师
export function addTechData(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/addTech`, obj)
}
//增加技师保存
export function addTechSave(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/addTechSave`, obj)
}
//改派技师
export function dispatchTechData(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/dispatchTech`, obj)
}
//改派技师保存
export function dispatchTechSave(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/dispatchTechSave`, obj)
}
