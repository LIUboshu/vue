import { request } from "network/request.js"

//  商品列表数据
export function getGoods(query,pagenum,pagesize){
    return request({
        url:"goods",
        params:{
            query,  //查询参数
            pagenum,    //当前页码  
            pagesize    //每页显示条数
        }
    })
}
// 删除商品
export function delGoods(id){
    return request({
        url:`/goods/${id}`,
        method:"delete"
    })
}
// 添加商品
export function postGoods(goods_name,goods_price,goods_weight,goods_number,goods_cat,pics,goods_introduce,attrs){
    return request({
        url:'/goods',
        method:'post',
        data:{
            goods_name,
            goods_price,
            goods_weight,
            goods_number,
            goods_cat,
            pics,
            goods_introduce,
            attrs
        }
    })
}