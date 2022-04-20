import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 axios
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/* // 跨域地址:http://123.207.32.32:8000/home/multidata?callback=json123
// 默认就是get请求   axios支持Promiase  直接在.then里面返回数据
axios({
  url:'http://123.207.32.32:8000/home/multidata',
  method:"get"
}).then( res => {
  console.log(res);
})

axios({
  // 分页接口 url:'http://123.207.32.32:8000/home/data?type=pop&page=1'
  url:'http://123.207.32.32:8000/home/data',
  // params针对get请求的参数拼接
  params:{
    type:'pop',
    page:1
  }
}).then(res=>{
  console.log(res);
}) */


/* // 全局配置 在进行网络请求  并发请求   axios.spread可将数组展开
  //  全局配置 defaults默认 公共的才写到全局配置
axios.defaults.baseURL = "http://123.207.32.32:8000";//设置基础url
axios.defaults.timeout = 3000;//3秒钟  数据没有返回  取消这个请求
// 并发请求
axios.all([axios({
  url:"/home/multidata"
}),axios({
  url:"https://api.apiopen.top/getJoke?page=1&count=10&type=text",
  // params针对get请求的参数拼接
  params:{
    type:'pop',
    page:1
  }
})]).then(axios.spread((res1,res2)=>{
  // axios.spread 数据展开
  console.log(res1);
  console.log(res2);
})) */



/* 
// 创建对象axios 的实例
const instance1 = axios.create({
  baseURL:'http://123.207.32.32:8000',
  timeout:5000,
})
instance1({
  url:'/home/multidata'
}).then(res => {
  console.log(res);
})
instance1({
  url:'/home/data',
  params:{
    type:'pop',
    page:1
  }
}).then(res =>{
  console.log(res);
})
 */




 
// 封装request模块
import { request } from "./network/request";

/* request({
  url:'/home/multidata'
}, res =>{
  console.log(res)
}, err =>{
  console.log(err)
}) */

request({
  url:'/home/multidata'
}).then(res =>{
  console.log(res)
}).catch(err =>{
  console.log(err)
})