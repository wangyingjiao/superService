import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
// 获取签名
export function getSign() {
  var sign = {}
  if (Cookies.get('sign')) {
    sign = JSON.parse(Cookies.get('sign'))
  } else {
    instance.get(`/api/oss/getSign`).then(res => {
      console.log(res.data, '签名')
      var obj = res.data
      Cookies.set('sign', JSON.stringify(obj))
      sign = JSON.parse(Cookies.get('sign'))
    })
  }
  return sign
}
