import axios from 'axios'

let instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
//订单列表（分页）
 export function getOrderTable(obj,pageNumber,pageSize) {
   return instance.post(`/apiservice/a/service/order/orderInfo/listData?pageNo=`+pageNumber+'&pageSize='+pageSize, obj)
 }
