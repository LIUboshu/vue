import axios from "axios";

// 导入Nprogress包对应的js/css
// 添加进度条
/* 
            切换时出现进度条
                cnpm install --save nprogress
                在 
                // 导入Nprogress包对应的js/css
                import Nprogress from "nprogress";
                import "nprogress/nprogress.css";
                需要配置拦截器 请求拦截器和响应拦截器
*/
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

export function request(config){
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL:'http://timemeetyou.com:8889/api/private/v1',
        timeout:5000
    })
    // 2.axios的拦截器
    // 2.1 请求拦截的作用  这里的instance换成axios就是全局拦截

    // 在request拦截其中,展示进度条Nprogress.start()
    instance.interceptors.request.use(function(config){
        // console.log("请求拦截成功");

        // 1.比如config中的一些信息不符合服务器的要求
        // 2.比如每次发送网络请求时,都希望在界面中显示一个请求图标
        // 3.某些网络请求(比如登陆token),必须携带一些特殊的信息
		Nprogress.start();
		// console.log(config);
		// 请求头对象,添加token验证的Authorization字段
		config.headers.Authorization = window.sessionStorage.getItem('token');
		
        return config;// 这里必须返回 config
    },function(err){
        console.log(err);
    })
    // 2.2响应拦截

    // 在response拦截其中,展示进度条Nprogress.done()
    instance.interceptors.response.use(res=>{
        // console.log(res);
        Nprogress.done();
        return res;// 这里拦截过 必须返回
    }, err => {
        console.log(err);
    })
    // 3.发起真正的网络请求
    return instance(config);// 本身返回就是一个Promise
}