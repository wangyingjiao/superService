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
axios.defaults.withCredentials = true
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
Vue.prototype.$http = axios
//按下标删除数组的对应元素
Array.prototype.del = function(dx){ 
  if(isNaN(dx)||dx>this.length){return false;} 
  this.splice(dx,1); 
} 
//指定元素从Array对象中删除
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
    if (index > -1) {
    this.splice(index, 1);
    }
  };

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
