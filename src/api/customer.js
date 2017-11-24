import axios from 'axios'

let instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
// 获取客户表格信息
export function getCusTable(obj) {
  return instance.post(`/api/a/service/order/orderCustomInfo/listData`, obj)
}
// 删除客户
export function deleteCus(obj) {
  return instance.post(`/api/a/service/order/orderCustomInfo/deleteSortInfo`, obj)
}
//保存客户（新增）
export function saveCus(obj) {
  return instance.post(`/api/a/service/order/orderCustomInfo/saveData`, obj)
}


