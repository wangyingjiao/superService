import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  headers: { 'content-type': 'application/json;charset=UTF-8' }

})
instance.interceptors.request.use(config => {
  for (var i in config.data) {
    console.log(encodeURI(config.data[i]), '拦截器----------------')
    config.data[i] = encodeURI(config.data[i])
  }
  // console.log(config.data,'拦截器输出的值')
  return config
}, error => {
  console.log(error)
})
// 获取签名
export function getSign() {
  var sign = {}
  if (Cookies.get('sign')) {
    sign = JSON.parse(Cookies.get('sign'))
  } else {
    instance.get(`/apiservice/oss/getSign`).then(res => {
      console.log(res.data, '签名')
      var obj = res.data
      Cookies.set('sign', JSON.stringify(obj))
      sign = JSON.parse(Cookies.get('sign'))
    })
  }
  return sign
}
