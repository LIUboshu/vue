import { request } from "network/request.js";
//订单数据列表
export function getOrders(params){
    return request({
        url:'orders',
        params
    })
}
// 查看物流信息
export function getKuaidi(id){
    return request({
        url:`/kuaidi/${id}`
    })
}