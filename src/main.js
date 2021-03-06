import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/icons' // icon
import '@/permission' // 权限

// import 'animate.css'
// axios.defaults.withCredentials = true
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.imgSrc = 'https://imgcdn.guoanshequ.com/'
Vue.prototype.picWidth400 = '?x-oss-process=image/resize,m_fill,h_400,w_400'
Vue.prototype.picWidth120 = '?x-oss-process=image/resize,m_fill,h_120,w_120'
Vue.prototype.picWidth250 = '?x-oss-process=image/resize,w_250'
Vue.prototype.picWidth400Auto = '?x-oss-process=image/resize,m_pad,h_400,w_400'
Vue.prototype.picWidth60 = '?x-oss-process=image/resize,m_fill,h_60,w_60'
Vue.prototype.picWidth100 = '?x-oss-process=image/resize,m_fill,h_100,w_100'
Vue.prototype.picWidth300 = '?x-oss-process=image/resize,m_fill,h_170,w_300,limit_0'
// 按下标删除数组的对应元素
Array.prototype.del = function(dx) {
  if (isNaN(dx) || dx > this.length) { return false }
  this.splice(dx, 1)
}
// 指定元素从Array对象中删除
Array.prototype.remove = function(val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}
// 确定指定对象是否是 Array 对象中的元素
Array.prototype.contains = function(obj) {
  var i = this.length
  while (i--) {
    if (this[i] === obj) {
      return true
    }
  }
  return false
}
// 数组去重
Array.prototype.unique = function() {
  var res = [this[0]]
  for (var i = 1; i < this.length; i++) {
    var repeat = false
    for (var j = 0; j < res.length; j++) {
      if (this[i] === res[j]) {
        repeat = true
        break
      }
    }
    if (!repeat) {
      res.push(this[i])
    }
  }
  return res
}
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
