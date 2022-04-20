import { request } from "network/request.js";
export function navHome (){
    return request({
        url:'/menus'
    })
}