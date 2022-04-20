<template>
  <div id="app">
    <main-tabber class="main-tabber"></main-tabber>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import mainTabber from 'components/content/mainTabber.vue'
  export default {
    name:'app',
    components:{
      mainTabber
    }
  }
</script>
<style lang="less">
  @import "./assets/css/base.css";
  .main-tabber{
    z-index: 8;
  }
</style> 
