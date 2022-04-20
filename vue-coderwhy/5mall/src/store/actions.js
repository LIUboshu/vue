import { 
    ADD_COUNTER,
    ADD_TO_CART
 } from "./mutations-type.js";
export default {
    addCart(context,payload){
      // 如果在vuex里面做了某个操作,想让外面知道完成了这个操作这里需要用到promise
      return new Promise((resolve,reject)=>{
        // payload是新添加的商品
        //1. 查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find((item)=>item.iid === payload.iid)
        // 给cartList里面的商品对象 添加count属性  数量
        // 2.判断oldProduct如果count就加1 如果没有添加count 并赋值为1
        if(oldProduct){
          // oldProduct.count  += 1
          context.commit(ADD_COUNTER,oldProduct);
          resolve('当前的商品数量+1')
        }else{
          payload.count = 1;
          // context.state.cartList.push(payload);
          context.commit(ADD_TO_CART,payload);
          resolve('添加了新的商品')
        }
      })
      
    }
}