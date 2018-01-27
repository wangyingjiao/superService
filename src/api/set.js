import instance from '@/utils/fetch'

export function getLog(obj, pageNumber, pageSize) {
  return instance.post(`/apiservice/a/service/log/serviceLog/listData?pageNo=` + pageNumber + '&pageSize=' + pageSize, obj)
}
