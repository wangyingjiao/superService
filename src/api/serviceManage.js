import axios from 'axios'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})

export function getClass() {
  return instance.get(`/api/a/service/sort/serSortInfo/listData`)
}
export function getProject() {
  return instance.get(`/api/a/service/item/serItemInfo/listData`)
}
export function getSkill() {
  return instance.get(`/api/a/service/skill/serSkillInfo/listData`)
}
export function addClass(obj) {
  return instance.post(`/api/a/service/sort/serSortInfo/saveData`, obj)
}
export function addProject(obj) {
  return instance.post(`/api/a/service/item/serItemInfo/saveData`, obj)
}
