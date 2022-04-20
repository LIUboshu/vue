import axios from "axios";

export function requestTabControl(config){
    // 1.创建axios的实例
    const instance = axios.create({
        // baseURL:'http://152.136.185.210:7878/api/m5',
        baseURL:'http://152.136.185.210:7878/api/hy66',
        timeout:5000
    })
    // 2.axios的拦截器
    // 2.1 请求拦截的作用  这里的instance换成axios就是全局拦截
    instance.interceptors.request.use(function(config){
        // console.log("请求拦截成功");

        // 1.比如config中的一些信息不符合服务器的要求
        // 2.比如每次发送网络请求时,都希望在界面中显示一个请求图标
        // 3.某些网络请求(比如登陆token),必须携带一些特殊的信息

        return config;// 这里必须返回 config
    },function(err){
        console.log(err);
    })
    // 2.2响应拦截
    instance.interceptors.response.use(res=>{
        // console.log(res);
        return res;// 这里拦截过 必须返回
    }, err => {
        console.log(err);
    })
    // 3.发起真正的网络请求
    return instance(config);// 本身返回就是一个Promise
}