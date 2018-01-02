import axios from 'axios'

let instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
export function getTable() {
  return instance.get(`/apiservice/a/sys/user/listData?orderBy=update_date`)
}
// export function addMana(obj) {
//   return instance.post(`/apiservice//a/sys/office/saveData`, obj)
// }
