import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
// 获取签名
export function getSign() {
  var sign= {}
  if (Cookies.get('sign')) {
    sign= JSON.parse(Cookies.get('sign'))
  } else {
    instance.get(`/api/oss/getSign`).then(res => {
      var obj = res.data
      // var time = parseInt(res.data.expire) + 1800
      Cookies.set('sign', JSON.stringify(obj), { expires: 0.35 })
      //console.log(JSON.parse(Cookies.get('sign')))
      sign= JSON.parse(Cookies.get('sign'))
    })
  }
  return sign
}
