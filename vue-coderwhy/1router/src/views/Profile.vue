<template>
  <div>
      <h2>我是Profile组件</h2>
      <h3>{{ $route.query.name }}</h3>
      <h3>{{ $route.query.age }}</h3>
      <h3>{{ $route.query.height }}</h3>
  </div>
</template>

<script>
export default {
    name:"Profile",
     created () {
        console.log('Profile create 创建');
    },
    destroyed () {
        console.log('Profile destroyed 销毁');
    }
}
</script>

<style>

</style>