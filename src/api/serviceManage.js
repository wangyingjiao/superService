import axios from 'axios'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})

export function getClass() {
  return instance.get(`/api/a/service/sort/serSortInfo/listData`)
}
export function addClean(obj) {
  return instance.post(`/api/a/service/sort/serSortInfo/saveData`, obj)
}
