import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from "vue-lazyload";

import FastClick from "fastclick";//解决移动端按钮300ms延迟

import toast from "components/common/toast/index.js";

Vue.config.productionTip = false

// 给 $bus  赋值Vue实例   事件总线
Vue.prototype.$bus = new Vue();

// 安装toast插件
Vue.use(toast);

//解决移动端按钮300ms延迟
FastClick.attach(document.body);

//使用懒加载的插件
Vue.use(VueLazyload,{
  // 加载时显示的图片
  loading:require('./assets/img/common/logo.png')
});

/* 
  vue-lazyload 图片懒加载使用
    1.安装  npm install vue-lazyload --save
    2.导入
    3.Vue.use
    4.修改img  :src  --->  v-lazy

*/

/* 
  因为涉及到非父子组件的通信,所以选择了   事件总线
    $bus
    1. Vueprototype.$bus = new Vue()
    2. this.$bus.$emit('事件名称',参数)
    3. this.$bus.$on('事件名称',回调函数(参数))

*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
 
 
 // 函数调用时  会压入函数栈(保存函数调用过程中所有的变量)
 // 函数调用结束   会弹出函数栈(释放函数所有的变量)  内存回收掉