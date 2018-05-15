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
// 根据手机号查找客户
export function findCustomerByPhone(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/findCustomerByPhone`, obj)
}
// 根据ID查找客户
export function findCustomerById(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/findCustomerById`, obj)
}
// 获取服务项目列表
export function findItemList(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/findItemList`, obj)
}
// 获取服务项目下的商品列表
export function findGoodsListByItem(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/findGoodsListByItem`, obj)
}
// 获取商品的技师列表
export function findTechListByGoods(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/findTechListByGoods`, obj)
}
// 获取技师的时间列表
export function findTimeListByTech(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/findTimeListByTech`, obj)
}
// 新增订单保存
export function createOrder(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/createOrder`, obj)
}
// 获取建议服务时长
export function findGoodsNeedTech(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/findGoodsNeedTech`, obj)
}
// 取消订单
export function orderCancelFun(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/orderCancel`, obj)
}
// 退款
export function orderRefundInit(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/orderRefundInit`, obj)
}
// 退款保存
export function orderRefundSave(obj) {
  return instance.post(`/apiservice/a/service/order/orderInfo/orderRefundSave`, obj)
}
// 退款列表
export function listDataRefund(obj, pageNumber, pageSize) {
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/order/orderInfo/listDataRefund?pageNo=${pageNumber}&pageSize=${pageSize}`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 退款详情
export function formDataRefund(obj) {
  console.log(obj, 'obj')
  return new Promise((resolve, reject) => {
    instance.post(`apiservice/a/service/order/orderInfo/formDataRefund`, obj).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}
// 收款列表
export function getPay(obj, pageNumber, pageSize) {
  return instance.post(`apiservice/a/service/order/orderInfo/listDataPay?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 组合订单列表
export function getCombination(obj, pageNumber, pageSize) {
  return instance.post(`apiservice/a/ service/order/orderInfo/listDataCombination?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
