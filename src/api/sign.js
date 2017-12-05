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
      var obj = res.data
      // var expiresDate = new Date()
      // expiresDate.setTime(expiresDate.getTime() + (30 * 60 * 1000))
      // console.log(expiresDate)
      // Cookies.set('sign', JSON.stringify(obj), { expires: expiresDate })
      Cookies.set('sign', JSON.stringify(obj), { expires: 0.35 })
      // console.log(JSON.parse(Cookies.get('sign')))
      sign = JSON.parse(Cookies.get('sign'))
    })
  }
  return sign
}
