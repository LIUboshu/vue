import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

Vue.use(Vuex)
// 把state进行了抽离
const state = {
  cartList:[]//购物车商品数组
}
export default new Vuex.Store({
  state,
  mutations,// 把mutations进行了抽离
  actions,// 把actions进行了抽离,
  getters,
  modules: {
  }
})
