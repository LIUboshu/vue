import Vue from 'vue'
import { INCREMENT } from './mutations-types'
export default{
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
        Vue.set(state.info,'sex','男')    // set方法,,,,,响应式的另外一种方法
    },
    infoDelClickx(state){
        // 响应式 删除info 里面的age属性
        Vue.delete(state.info,'age')
    },
    // 默认参数state
    updateInfox(state){
        state.info.name = 'kobe'
    }
}