import axios from 'axios'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
// 提交
// export function addTech(obj) {
//   return instance.post(`/api/a/service/technician/serviceTechnicianInfo/savePersonalData`,obj)
// }
//获取列表
export function getListdata() {
    return instance.get(`/api/a/service/skill/serSkillInfo/listData`)
}
// //获取省级区域
// export function getArea() {
//     return instance.get(`/api/a/sys/area/getchildArea`)
// }