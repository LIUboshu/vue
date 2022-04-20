import Vue from 'vue'
import App from './App.vue'
// 在这里导入router
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,// 使用router必须挂载到实例
  store,
  render: h => h(App)
}).$mount('#app')


// console.log(router);// new VueRouter()