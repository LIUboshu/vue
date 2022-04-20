<template>
  <div class="home">
    <h2>我是首页</h2>
    <p>我是首页内容,哈哈</p>
    <!-- 这里router-link写完整路径  -->
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/msg">消息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// 把组件导出
export default {
  name: 'Home',
  data () {
    return {
      path:'/home/news'
    }
  },
  created () {
    console.log('home create 创建');
  },
  destroyed () {
    console.log('home destroyed 销毁');
  },
  
  // activated和deactivated这两个函数,只有该组件被保持了状态使用了keep-alive时,才有效
  activated () {
    // 在 keep-alive 组件激活时调用  该钩子函数在服务器端渲染期间不被调用
    this.$router.push(this.path);
    console.log('activated 活跃');
  },
  deactivated () {
    // 在 keep-alive 组件停用时调用  该钩子在服务器端渲染期间不被调用
    console.log('deactivated 停用');
  },

  // 点击消息后 点击其他按钮(例如用户)返回首页依然显示首页消息页面
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log(this.$route.path);// 获取path
    this.path = this.$route.path;// 实现点击 消息 时切换其他路由之后再切换回来时依然显示消息
    next();
  } 
 

}
</script>
