import { 
    ADD_COUNTER,
    ADD_TO_CART
 } from "./mutations-type.js";

export default {
    // mutations唯一的目的就是修改state中的状态
    // mutations中的每一个方法尽可能完成的事件比较单一
    [ADD_COUNTER](state,payload){
      payload.count++
    },
    [ADD_TO_CART](state,payload){
      payload.checked = true;  // 在数据中添加checked 布尔  在模型中修改选中和不选中的选择
      //选中和不选中要在模型里面修改   不要只修改样式   通过模型的 true和false 来决定选中和不选中
      state.cartList.push(payload);
    }
}