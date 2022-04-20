<template>
  <div class="wrapper" ref="aaaa">
    <div>
      <!--1.无论是否设置click:false, button都可以点击-->
      <button @click="btnClick">按钮</button>

      <!--2.必须设置click:true, 那么div才能监听点击-->
      <div @click="divClick">呵呵呵呵</div>

      <ul class="content">
        <li>分类列表1</li>
        <li>分类列表2</li>
        <li>分类列表3</li>
        <li>分类列表4</li>
        <li>分类列表5</li>
        <li>分类列表20</li>
        <li>分类列表67</li>
        <li>分类列表68</li>
        <li>分类列表69</li>
        <li>分类列表70</li>
        <li>分类列表71</li>
        <li>分类列表72</li>
        <li>分类列表73</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    // 组件创建完后调用
    mounted() {
      this.scroll = new BScroll(this.$refs.aaaa, {
        click:true,
        probeType: 3,
        pullUpLoad: true
      })

      this.scroll.on('scroll', (position) => {
        console.log(position);
      })

      this.scroll.on('pullingUp', () => {
        console.log('上啦加载更多');
      })
    },
    methods: {
      btnClick() {
        console.log('btnClick');
      },
      divClick() {
        console.log('divClick');
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;

    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
