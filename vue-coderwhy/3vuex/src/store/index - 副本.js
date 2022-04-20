import Vue from 'vue'
import Vuex from 'vuex'

// 导入 使用常量替代 Mutation 事件类型
import { INCREMENT } from './mutations-types'

// 1. 安装插件
Vue.use(Vuex)

// 创建对象
const moduleA = {
	state:{
		name:'张三'
	},
	mutations:{
		updateNamex(state,payload){
			state.name = payload;
		}
	},
	getters:{
		fullname(state){
			return state.name + 1111
		},
		fullname2(state,getters){
			return getters.fullname + 2222
		},
		// 这里的第三个参数rootState,(根的状态)是为了 拿到对象里面的state里面的num
		fullname3(state,getters,rootState){
			return getters.fullname2 + rootState.num
		}
	},
	actions:{
		aUpdateName(context){
			// 在模块里面才有根的概念
			console.log(context);
			setTimeout(()=>{
				context.commit('updateNamex','wangwu')
			},1000)
		}
	}
}

//创建对象  并  导出
export default new Vuex.Store({
  state: {
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
  },
  mutations: {
    // vuex的store状态的更新唯一方式:提交mutation
    // mutation主要包括两部分:
    //    字符串的事件类型(type)
    //    一个回调函数,该回调函数的第一个参数就是state
    // 参数被称为mutation的载荷(payload)


    // 方法中    默认会传state
    // increment(state){}
    // 只要修改state  都是通过mutations 修改的

    /* increment(state){
      state.counter++
    }, */

    // 使用常量替代 Mutation 事件类型
    [INCREMENT](state){
      state.counter++
    },
    decrement(state){
      state.counter--
    },
    // 1.普通的提交封装接收返回
    // addCounterx(state,coun){
    //   state.counter += coun
    // },

    // // 2.特殊的提交封装   此时传入的payload可以自定义名字   payload打印出来是一个对象
    addCounterx(state,payload){
      state.counter += payload.coun
    },
    addStudentx(state,str){
      console.log(str);
      // 增加对象
      state.students.push(str);
    },
    // mutations提交风格,vue还提供了另外一种提交风格,它是一个包含type属性的对象
    updataInfo(state){

      //state.info.name = "zhangsan",

      setTimeout(()=>{
        // Mutation 必须是同步  不可以异步  如果出现异步,跟踪调试工具的数据不同步
        state.info.name = "zhangsan"
      },1000),

      // 添加 info 里面没有的属性
      state.info['address'] = "北京", //cli4这里可以在页面显示   可以做到响应式
      Vue.set(state.info,'sex','男')    // 低版本必须用set方法,,,,,响应式的另外一种方法
    },
    infoDelClickx(state){
      // 响应式 删除info 里面的age属性
      Vue.delete(state.info,'age')
    },
    // 默认参数state
	  updateInfox(state){
		  state.info.name = 'kobe'
	  }
  },
  actions: {
    // 做异步操作
    // 编程把context翻译成:上下文
	  // 默认属性context
	  // 这里的异步操作,通过context.commit 提交一个 mutation,通过mutations修改state数据
	  
	  /*
	  aUpdateInfo(context,payload){
		  setTimeout(function(){
			  context.commit('updateInfox');
			  console.log(payload)
		  },1000)
	  }
	  */
	 
	 /*
	  aUpdateInfo(context,payload){
		  setTimeout(function(){
			  context.commit('updateInfox');
			  // 当commit就说明成功,不成功就报错了.成功之后回调
			  console.log(payload.msg);
			  payload.success();
		  },1000)
	  }
	  */
	 
	 aUpdateInfo(context,payload){
      return new Promise((resolve,reject)=>{
        setTimeout(function(){
            context.commit('updateInfox');
            console.log(payload);
            resolve('11111');
        },1000)
      })	  
    }
  },
  getters: {
    // 好比组件里面的计算属性
    powerCounter(state){
      return state.counter * state.counter
    },
    more20stu(state){
      // 把大于20岁的筛选出来
      return state.students.filter(a => a.age >= 20);
    },
    more20stuLength(state,getters){// 这里的getters是vuex里面的getters   这里getters的名字可以自定义   
      return getters.more20stu.length;
    },
    // 输出不是固定的年龄的数据   getters传参
    moreAgestu(state){
      // 这里要传参  必须写函数
      return function(age){
        return state.students.filter(s => s.age >= age)
      }
    }
  },
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
