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
    addCart(state,payload){

      // payload是新添加的商品

      /* 
      let oldProduct = null;
      for (const item of state.cartList) {
        if(payload.iid === item.iid){
          oldProduct = item;
        }
      }
      */
      //1. 查找之前数组中是否有该商品
      /* let oldProduct = state.cartList.find(function(item){
        return  item.iid === payload.iid
      }) */
      let oldProduct = state.cartList.find((item)=>item.iid === payload.iid)
      // 给cartList里面的商品对象 添加count属性  数量
      if(oldProduct){
        oldProduct.count  += 1
      }else{
        payload.count = 1;
        state.cartList.push(payload);
      }
      
    }
  },
  actions: {
    
  },
  modules: {
  }
})
