import axios from 'axios'

let instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
export function getTable() {
  return instance.get(`/api/a/sys/user/listData?orderBy=update_date`)
}
// export function addMana(obj) {
//   return instance.post(`/api//a/sys/office/saveData`, obj)
// }
