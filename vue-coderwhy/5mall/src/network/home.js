// 没有加default  就需要加{}
import { request } from "network/request.js";
import { requestTabControl } from "network/request2.js";

export function getHomeMultidata (){
    return request({
        url:'/home/multidata'
    })
}
export function getHomeTabControl (type,page){
    return requestTabControl({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}