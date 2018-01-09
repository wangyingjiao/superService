import axios from 'axios'
const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }
})
// instance.interceptors.request.use(config => {
//   for (var i in config.data) {
//     console.log(encodeURI(config.data[i]), '拦截器----------------')
//     config.data[i] = encodeURI(config.data[i])
//   }
//   // console.log(config.data,'拦截器输出的值')
//   return config
// }, error => {
//   console.log(error)
// })
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
export function addClass(obj) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/saveData`, obj)
}
export function addProject(obj) {
  return instance.post(`/apiservice/a/service/item/serItemInfo/saveData`, obj)
}
export function delClass(obj) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/deleteSortInfo`, obj)
}
export function delProject(obj) {
  return instance.post(`/apiservice/a/service/item/serItemInfo/deleteSortInfo`, obj)
}
export function getSuccess(obj) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/checkCityItem`, obj)
}
export function getInfoPic(obj) {
  return instance.post(`/apiservice/a/service/item/serItemInfo/getSerItemInfoPic`, obj)
}
export function setClass(obj) {
  return instance.post(`/apiservice/a/service/sort/serSortInfo/formData`, obj)
}

