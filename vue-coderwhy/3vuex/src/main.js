import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 挂载store
import store from './store'
// 挂载完毕之后里面会有$store

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
