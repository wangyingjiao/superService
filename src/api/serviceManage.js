import axios from 'axios'
const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }
})

export function getCity() {
  return instance.get(`/apiservice/a/sys/organization/getOrgCityCodes`)
}
export function getClass(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
export function getProject(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/item/serItemInfo/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
export function getSkill() {
  return instance.get(`/apiservice/a/service/skill/serSkillInfo/listData`)
}
// 新增分类
export function addClass(obj) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/saveData`, obj)
}
// 新增项目
export function addProject(obj) {
  return instance.post(`/apiservice/a/service/item/serItemInfo/saveData`, obj)
}
// 删除分类
export function delClass(obj) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/deleteSortInfo`, obj)
}
// 删除项目
export function delProject(obj) {
  return instance.post(`/apiservice/a/service/item/serItemInfo/deleteSortInfo`, obj)
}
// export function getSuccess(obj) {
//   return instance.post(`/apiservice/a/service/sort/serSortInfo/checkCityItem`, obj)
// }
export function getInfoPic(obj) {
  return instance.post(`/apiservice/a/service/item/serItemInfo/getSerItemInfoPic`, obj)
}
// 编辑分类的数据
export function setClass(obj) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/formData`, obj)
}

// 编辑项目
export function upProject(obj) {
  return instance.post(`/apiservice/a/service/item/serItemInfo/upData`, obj)
}
// 编辑分类
export function upClass(obj) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/upData`, obj)
}