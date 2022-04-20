<template>
  <div class="home">
    <h2>-------info对象内容是否是响应式的--------------------</h2>
    <h2>{{$store.state.info}}</h2>
    <button @click="infoClick">修改info数据(增加)</button>
    <button @click="infoDelClick">修改info数据(删除)</button>  
    <h2>home内容----------------------------</h2>
    <h2>{{ $store.state.counter }}</h2>
    <!-- 这里的 $store.state.counter++  可以实现,但是官方不允许这样操作-->

    <!-- 
        state -> Vuecomponents -> actions -> mutations  -> state
        actions 异步操作    请求数据时
        mutations   同步操作   如果没有异步  Vue components 可以直接绕过 actions 到 mutations
        state -> Vuecomponents  -> mutations  -> state
     -->


    <!-- <button @click="$store.state.counter++">+</button>
    <button @click="$store.state.counter--">-</button> -->

    <button @click="addition">+</button>
    <button @click="subtraction">-</button>
    <button @click="addCounter(5)">+5</button>
    <button @click="addCounter(10)">+10</button>
    <button @click="addStudent">增加学生</button>
    <h2>----getters相关信息-----------------------</h2>
    <h2>{{$store.getters.powerCounter}}</h2>


    <h2>{{$store.getters.more20stu}}</h2>
    <h2>{{$store.getters.more20stuLength}}</h2>
    <h2>{{$store.getters.moreAgestu(30)}}</h2>

    <h2>组件HelloVuex内容----------------------------</h2>
    <hr/>
    <hello-vuex></hello-vuex>
    <hr/>
    <h2>{{ $store.state.info }}</h2>
	  <button @click="updateInfo" type="button">修改info数据</button>
    <h2>-----------moduleA----------</h2>
    <h2>{{ $store.state.a.name }}</h2>
    <button @click="updateName" type="button">修改moduleA</button>
    <h2>{{ $store.getters.fullname }}</h2>
    <h2>{{ $store.getters.fullname2 }}</h2>
    <h2>{{ $store.getters.fullname3 }}</h2>
    <button @click="aasyncUpdateName" type="button">moduleA异步</button>
  </div>
</template>

<script>

import HelloVuex from '../components/HelloVuex'
// 导入 使用常量替代 Mutation 事件类型
import { INCREMENT } from '../store/mutations-types'

export default {
  name: 'Home',
  data () {
    return {
      // counter:0
    }
  },
  components: {
    HelloVuex
  },
  methods: {
    addition(){
      // 通过commit方法提交 (第一个参数传入mutations定义方法的名字)
      // this.$store.commit('increment');
      this.$store.commit(INCREMENT);//使用常量替代 Mutation 事件类型
    },
    subtraction(){
      this.$store.commit('decrement');
    },
    addCounter(coun){
      // payload 负载
      // 1.普通的提交封装
      // this.$store.commit('addCounterx',coun);

      // 2.特殊的提交封装
      this.$store.commit({
        type:'addCounterx',
        coun
      })
    },
    addStudent(){
      let str = {id:115,name:'zhangsan',age:35};
      this.$store.commit('addStudentx',str);
    },
    // mutations提交风格,vue还提供了另外一种提交风格,它是一个包含type属性的对象,
    infoClick(){
      this.$store.commit('updataInfo')
    },
    infoDelClick(){
      this.$store.commit("infoDelClickx")
    },

    updateInfo(){
      // this.$store.commit('updateInfox')
      
      // 异步操作
      // store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise：
      
      // this.$store.dispatch('aUpdateInfo','这里传递payload参数')
      
      /*
      this.$store.dispatch('aUpdateInfo',{
        msg:'这里是携带的信息',
        success:()=>{
          console.log('这里面已经完成');
        }
      })
      */
    
      this.$store
        // 这里的 aUpdateInfo 返回一个Promise, 所以下面可以调用then
        .dispatch('aUpdateInfo','我是携带信息')
        // 这里的res传递了参数
        .then(res => {
          console.log('里面完成了提交');
          console.log(res);
      })
    },
    updateName(){
      this.$store.commit('updateNamex','lisi')
    },
    aasyncUpdateName(){
      this.$store.dispatch('aUpdateName')
    }
  }
}
</script>
