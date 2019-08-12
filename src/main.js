import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from './vant/index'
Vant();

// Vue继承axios
import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')