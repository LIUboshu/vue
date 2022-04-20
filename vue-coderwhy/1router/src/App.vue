<template>
  <div id="app">
    <!-- 
        router-link的其他属性:
          tag:tag可以指定<router-link>渲染成其他组件   比如:<router-link to="/" tag="button">首页</router-link>   渲染成button
          replace:replace不会留下history记录,所以在指定replace的情况下,后退键返回不能返回到上一个页面中
          active-class:当<router-link>对应的路由匹配成功时,会自动给当前元素设置一个router-link-active的class,设置active-class可以修改默认的名称
     -->


     <!-- <router-link to="/home" tag="button" replace>首页</router-link>
    <router-link to="/about" tag="button" replace>关于</router-link> -->

    <!-- <router-link to="/home" tag="button" replace active-class="active">首页</router-link>
    <router-link to="/about" tag="button" replace active-class="active">关于</router-link> -->

    <router-link to="/home" tag="button" replace>首页</router-link>
    <router-link to="/about" tag="button" replace>关于</router-link>

    <!-- <router-link to="/profile">档案</router-link> -->

    <!-- 第一种:编程式的导航  声明式 -->
    <router-link :to="'/user/'+user">用户</router-link>
    <router-link :to="{path:'/profile',query:{name:'钢铁侠',age:18,height:1.88}}">档案</router-link>

    <ul>
      <li @click="shouyeclick">首页</li>
      <li @click="guanyuclick">关于</li>
    </ul>

    <!-- 第二种:编程式的导航  编程式 -->
    <button @click="userclick">用户</button>
    <button @click="profileclick">档案</button>

    <!-- 
        <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。
        在组件切换过程中将状态保留在内存中，防止重复渲染DOM，减少加载时间及性能消耗，提高用户体验性
        被包含在 keep-alive 中创建的组件，会多出两个生命周期的钩子: activated 与 deactivated
     -->

     <!-- 
       keep-alive 是vue内置的一盒组件,可以使被包含的组件保留状态,或避免重新渲染
				有两个属性:include-字符串和正则表达,只有匹配的组件回被缓存
						  exclude字符串或正则表达式,任何匹配的组件都不会被缓存  排除在外

      -->
      <!-- 设置Profile档案页面  频繁的创建   exclude="这里填Profile页面name的属性"   如果user页面也想频繁的创建和销毁里面加逗号(,)-->
    <keep-alive exclude="Profile,User">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name:"App",
  data () {
    return {
      user:"zhangsan"  
    }
  },
  methods: {
    shouyeclick(){
      console.log(this);
      // 通过代码的方式修改路由  vue-router
      // this.$router.push('/home');
      // 这里的$router是整个大的路由对象  router/index.js/ 创建VueRouter对象的 $router
      this.$router.replace('/home');// 无返回
    },
    guanyuclick(){
      // this.$router.push('/about');
      this.$router.replace('/about');
    },
    // 第二种:编程式的导航  编程式
    userclick(){
      this.$router.push('/user/' + this.user);
    },
    profileclick(){
      this.$router.push({ path: '/profile', query: { name:'钢铁侠',age:18,height:1.88 }})
    }
  }
}
</script>
<style lang="less">
.router-link-active{
  color: yellow;
}

.active{
  color: red;
}
</style>
