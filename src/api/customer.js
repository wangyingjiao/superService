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

