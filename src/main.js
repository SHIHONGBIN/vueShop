import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false

//配置全局样式
import './assets/css/global.scss'
//配置axios
import axios from 'axios'
//设置默认url
axios.defaults.baseURL = 'http://localhost:8081'
//设置token
axios.interceptors.request.use(config=>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
//挂载到Vue的原型上
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
