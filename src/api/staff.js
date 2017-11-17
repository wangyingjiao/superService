import axios from 'axios'

let qs = require('qs')
let instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})

export function addStaff(obj) {
  return instance.post(`/api//a/sys/user/saveData`, obj)
}
export function getStaff() {
  return instance.get(`/api//a/sys/user/listData?orderBy=update_date`)
}
//qiu
// export function getStaff1() {
//   return instance.get(`/api/a/sys/role/listData`)
// }
