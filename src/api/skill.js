import axios from 'axios'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
// 获取技能列表
export function getListdata(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/skill/serSkillInfo/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
// 新增保存技能
export function saveServer(obj) {
  return instance.post(`/apiservice/a/service/skill/serSkillInfo/saveData`, obj)
}
// 选择服务
export function orderServer(obj) {
  return instance.post(`/apiservice/a/service/skill/serSkillInfo/insertData`, obj)
}
// 删除技能
export function techDelet(obj) {
  return instance.post(`/apiservice/a/service/skill/serSkillInfo/deleteSortInfo`, obj)
}
// 编辑技能
export function editTech(obj) {
  return instance.post(`/apiservice/a/service/skill/serSkillInfo/formData`, obj)
}
// 编辑保存技能
export function upDataTech(obj) {
  return instance.post(`/apiservice/a/service/skill/serSkillInfo/upData`, obj)
}
