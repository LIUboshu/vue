import axios from "axios";

// 在一个文件或模块中，export、import可以有多个，export default仅有一个
// 通过export方式导出，在导入时要加{ }，export default则不需要

/* export function request(config,success,failure){
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout:5000
    })
    // 发起真正的网络请求
    instance(config).then(res =>{
        success(res);// 回调函数
    }).catch(err =>{
        failure(err);//  回调函数
    })
} */



/* 
export function request(config){
    return new Promise((resolve,reject) => {
        // 1.创建axios的实例
        const instance = axios.create({
            baseURL:'http://123.207.32.32:8000',
            timeout:5000
        })
        // 发起真正的网络请求
        instance(config).then(res =>{
            resolve(res);
        }).catch(err =>{
            reject(err);
        })
    })
    
}
 */



/* 
export function request(config){
    return new Promise((resolve,reject) => {
        // 1.创建axios的实例
        const instance = axios.create({
            baseURL:'http://123.207.32.32:8000',
            timeout:5000
        })
        // 发起真正的网络请求
        // 直接return  返回的就是一个promise
        return instance(config);
    })
    
}
 */
export function request(config){
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout:5000
    })
    // 2.axios的拦截器
    // 2.1 请求拦截的作用  这里的instance换成axios就是全局拦截
    instance.interceptors.request.use(function(config){
        console.log("请求拦截成功");

        // 1.比如config中的一些信息不符合服务器的要求
        // 2.比如每次发送网络请求时,都希望在界面中显示一个请求图标
        // 3.某些网络请求(比如登陆token),必须携带一些特殊的信息

        return config;// 这里必须返回 config
    },function(err){
        // 请求失败
        console.log(err);
    })
    // 2.2响应拦截
    instance.interceptors.response.use(res=>{
        console.log(res);
        return res;// 这里拦截过 必须返回
    }, err => {
        // 响应失败
        console.log(err);
    })
    // 3.发起真正的网络请求
    return instance(config);// 本身返回就是一个Promise
    
}