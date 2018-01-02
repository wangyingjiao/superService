import axios from 'axios'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
// 订单列表（分页）
export function getOrderTable(obj, pageNumber, pageSize) {
  return instance.post(`/api/a/service/order/orderInfo/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
