import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 这里引入阿里字体
import'@/assets/img/font/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
