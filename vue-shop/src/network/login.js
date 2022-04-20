import { request } from "network/request.js";
export function postLogin (username,password){
    return request({
        url:'/login',
        method: 'post',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        data:{
            username,
            password
        }
    })
}