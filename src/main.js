import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

import axios from 'axios'
Vue.prototype.$http = axios

//封装过滤方法
Vue.filter('setWH', (url, params) => {
  return url.replace(/w\.h/, params) //将url中的w.h替换为传入的params
})

Vue.config.productionTip = false

import Scroller from '@/components/Scroller'
Vue.component('Scroller', Scroller)
import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
