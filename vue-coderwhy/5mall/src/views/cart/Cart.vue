<template>
  <div id="cart">
      <nav-bar class="cart-navbar">
        <!-- <div slot="center">购物车({{cartLength}})</div> -->

        <!-- mapGetters  对象方法 -->
        <div slot="center">购物车({{length}})</div>
      </nav-bar>
      <cart-list></cart-list>
      <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import navBar from 'components/common/navbar/navBar.vue'
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";
import { mapGetters } from "vuex";// mapGetters 从vuex直接引入
export default {
  name:'cart',
  data () {
    return {
      
    }
  },
  components: {
    navBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 第一种方法
    /* cartLength(){
      return this.$store.state.cartList.length
    } */
    /* 
      cartLength(){
        return this.$store.getters.cartLength
      }
    */
    // 第二种方法   通过mapGetters  数组方法
    /* ...mapGetters([
      'cartLength'
    ]) */

    // ...mapGetters方法将vuex中的getters中的计算属性转换成局部计算属性
    // 例如:getters中有cartLength/cartList 直接拿过来用  模板里面直接用getters的方法

    // 第三种方法   通过mapGetters  对象方法
    ...mapGetters({
      length:'cartLength',
      list:'cartList'
    })
  }
}
</script>

<style lang="less" scoped>
#cart{
  height: 100vh;
  .cart-navbar{
    background-color: #ff8198;
    color: #ffffff;
  }
}


</style>