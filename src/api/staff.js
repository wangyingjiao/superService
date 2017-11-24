import axios from 'axios'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})

export function addStaff(obj) {
  return instance.post(`/api/a/sys/user/saveData`, obj)
}

export function getStation() {
  return instance.get(`/api/a/sys/role/listData`)
}
export function getStaff() {
  return instance.get(`/api/a/sys/user/listData?orderBy=update_date`)
}
export function addStation(obj) {
  return instance.post(`/api/a/sys/role/saveData`, obj)
}

// export function addMana(obj) {
//   return instance.post(`/api//a/sys/office/saveData`, obj)
// }
