import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]//购物车商品数组
  },
  mutations: {
    // mutations唯一的目的就是修改state中的状态
    // mutations中的每一个方法尽可能完成的事件比较单一
    addCounter(state,payload){
      payload.count++
    },
    addToCart(state,payload){
      state.cartList.push(payload);
    }
  },
  actions: {
    addCart(context,payload){
      // payload是新添加的商品
      //1. 查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find((item)=>item.iid === payload.iid)
      // 给cartList里面的商品对象 添加count属性  数量
      // 2.判断oldProduct如果count就加1 如果没有添加count 并赋值为1
      if(oldProduct){
        // oldProduct.count  += 1
        context.commit('addCounter',oldProduct);
      }else{
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit('addToCart',payload)
      }
    }
  },
  modules: {
  }
})
