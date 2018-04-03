import instance from '@/utils/fetch'

// 获取客户表格信息
export function getCusTable(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/order/orderCustomInfo/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 删除客户
export function deleteCus(obj) {
  return instance.post(`/apiservice/a/service/order/orderCustomInfo/deleteSortInfo`, obj)
}
// 保存客户（新增）
export function saveCus(obj) {
  return instance.post(`/apiservice/a/service/order/orderCustomInfo/saveData`, obj)
}
// 客户（编辑）
export function getCus(obj) {
  return instance.post(`/apiservice/a/service/order/orderCustomInfo/formData`, obj)
}
// 客户保侟（编辑）
export function upCus(obj) {
  return instance.post(`/apiservice/a/service/order/orderCustomInfo/upData`, obj)
}
// 地址管理
export function listDataAddress(obj) {
  return instance.post(`/apiservice/a/service/order/orderCustomInfo/listDataAddress`, obj)
}
// 新增地址保存
export function saveDataAddress(obj) {
  return instance.post(`/apiservice/a/service/order/orderCustomInfo/saveDataAddress`, obj)
}
// 编辑地址
export function formDataAddress(obj) {
  return instance.post(`/apiservice/a/service/order/orderCustomInfo/formDataAddress`, obj)
}
// 编辑地址保存
export function upDataAddress(obj) {
  return instance.post(`/apiservice/a/service/order/orderCustomInfo/upDataAddress`, obj)
}
// 删除地址
export function deleteDataAddress(obj) {
  return instance.post(`/apiservice/a/service/order/orderCustomInfo/deleteDataAddress`, obj)
}
// 设置默认地址
export function setDefaultAddress(obj) {
  return instance.post(`/apiservice/a/service/order/orderCustomInfo/setDefaultAddress`, obj)
}
