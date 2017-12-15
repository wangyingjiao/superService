import axios from 'axios'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
// 服务站Talbe
export function Skillserver(obj,pageNumber,pageSize) {
  return instance.post(`/api/a/service/skill/serSkillInfo/choiceTechnicianlistData?pageNo=`+pageNumber+'&pageSize='+pageSize,obj)
}
// 获取技能列表
export function getListdata(obj,pageNumber,pageSize) {
  return instance.post(`/api/a/service/skill/serSkillInfo/listData?pageNo=`+pageNumber+'&pageSize='+pageSize, obj)
}
//获取服务列表
export function getListser() {
  return instance.get(`/api/a/service/skill/serSkillInfo/getServiceStationList`)
}
//保存技能
export function saveServer(obj) {
  return instance.post(`/api/a/service/skill/serSkillInfo/saveData`,obj)
}
//选择服务
export function orderServer(obj) {
  return instance.post(`/api/a/service/skill/serSkillInfo/insertData`,obj)
}
//删除技能
export function techDelet(obj) {
  return instance.post(`/api/a/service/skill/serSkillInfo/deleteSortInfo`,obj)
}
//编辑技能
export function editTech(obj) {
  return instance.post(`/api/a/service/skill/serSkillInfo/formData`,obj)
}
