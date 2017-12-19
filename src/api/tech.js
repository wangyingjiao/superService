import axios from 'axios'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
// 提交
export function addTech(obj) {
  return instance.post(`/api/a/service/technician/serviceTechnicianInfo/savePersonalData`, obj)
}
// 获取民族
export function getTech() {
  return instance.get(`/api/a/sys/dict/listData?type=ethnic`)
}
// 获取学历
export function getEducations() {
  return instance.get(`/api/a/sys/dict/listData?type=education`)
}
// 婚姻状况
export function getMatrimony() {
  return instance.get(`/api/a/sys/dict/listData?type=matrimony`)
}
// 获取体重
export function getStrong() {
  return instance.get(`/api/a/sys/dict/techWeightList`)
}
// 获取体重
export function getHeight() {
  return instance.get(`/api/a/sys/dict/techHeightList`)
}

// 获取休假列表（不要删，上面没用的接口可以删掉，下面的是我加的）
export function getHoliday(obj, pageNumber, pageSize) {
  return instance.get(`/api/a/service/technician/serviceTechnicianHoliday/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 删除休假
export function delHoliday(obj) {
  return instance.post(`/api/a/service/technician/serviceTechnicianHoliday/delete`, obj)
}
