import axios from 'axios'

// 创建axios实例
const fetch = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  //timeout: 15000,                 // 请求超时时间
  headers: { 'content-type': 'application/json;charset=UTF-8' }
})
fetch.interceptors.request.use(config => {
  for (var i in config.data) {
    console.log(config.data[i], '拦截之前----------------')
    config.data[i] = encodeURI(config.data[i])
    console.log(config.data[i], '拦截之后----------------')
  }
   //console.log(config.data,'拦截器输出的值')
  return config
}, error => {
  return Promise.reject(error)
})
export default fetch
