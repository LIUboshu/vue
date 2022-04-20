<template>
  <div class="about">
    <h1>我是关于</h1>
    <p>我是关于内容,呵呵呵</p>
  </div>
</template>
<script>
// 把组件导出
export default {
  name:'About',
  created () {
    console.log('About create 创建');
  },
  destroyed () {
    console.log('About destroyed 销毁');
  }
}
</script>