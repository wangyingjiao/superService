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
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
