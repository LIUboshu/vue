import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import moduleA from './moduleA/moduleA'

// 导入 使用常量替代 Mutation 事件类型
// import { INCREMENT } from './mutations-types'

// 1. 安装插件
Vue.use(Vuex)

// 创建对象


const state = {
  // 保存共享状态   单一状态树,单一数据源
  num:999,
  counter:100,
  students:[
    {id:110,name:"why",age:18},
    {id:111,name:"kobe",age:21},
    {id:112,name:"lucy",age:25},
    {id:113,name:"lilei",age:25},
    {id:114,name:"wangwu",age:30},
  ],
  info:{
    name:"red",
    age:18,
    height:198
  }
}

//创建对象  并  导出
// 这里全部抽离出去   index-副本.js 是源代码
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    // 划分模块  
    // a:{
      //  state:{},
      //  mutations:{},
      //  actions:{},
      //  getters:{}
      // }
      
      a:moduleA
  }
})
