import axios from 'axios'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
//订单列表（分页）
 export function getOrderTable(obj,pageNumber,pageSize) {
   return instance.post(`/apiservice/a/service/order/orderInfo/listData?pageNo=`+pageNumber+'&pageSize='+pageSize, obj)
 }
//按ID获取订单信息
export function getOrderInf(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/formData`, obj)
}
//取消订单   
export function CancelOrderInf(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/cancelData`, obj)
}
