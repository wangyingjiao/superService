import axios from 'axios'

<<<<<<< HEAD
let qs = require('qs')
=======
>>>>>>> a081114da0983c7a5f4fa03e787e8df633496d7e
let instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})

export function addStaff(obj) {
<<<<<<< HEAD
  return instance.post(`/api//a/sys/user/saveData`, obj)
}
export function getStaff() {
  return instance.get(`/api//a/sys/user/listData?orderBy=update_date`)
}
//qiu
// export function getStaff1() {
//   return instance.get(`/api/a/sys/role/listData`)
=======
  return instance.post(`/api/a/sys/user/saveData`, obj)
}

export function getStaff() {
  return instance.get(`/api/a/sys/user/listData?orderBy=update_date`)
}
export function addMech(obj) {
  return instance.post(`/api/a/sys/office/saveData`, obj)
}
// export function addMana(obj) {
//   return instance.post(`/api//a/sys/office/saveData`, obj)
>>>>>>> a081114da0983c7a5f4fa03e787e8df633496d7e
// }
