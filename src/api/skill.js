import axios from 'axios'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
// 服务站Talbe
export function Skillserver(obj) {
  return instance.post(`/api/a/service/skill/serSkillInfo/choiceTechnicianlistData`,obj)
}
//获取列表
export function getListdata() {
    return instance.get(`/api/a/service/skill/serSkillInfo/listData`)
}
//获取服务列表
export function getListser() {
  return instance.get(`/api/a/service/skill/serSkillInfo/getServiceStationList`)
}

export function orderServer(obj) {
  return instance.post(`/api/a/service/skill/serSkillInfo/choiceSerlistData`,obj)
}
//删除技能

export function techDelet() {
  return instance.post(`/api/a/service/skill/serSkillInfo/deleteSortInfo`,obj)
}
