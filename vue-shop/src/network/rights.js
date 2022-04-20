import { request } from "network/request.js";

export function getRightsData(){
    return request({
        url:'/rights/list'
    })
}