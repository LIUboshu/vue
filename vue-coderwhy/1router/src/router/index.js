import Vue from 'vue'
// 配置路由
import VueRouter from 'vue-router'
// 导入组件
// import Home from '../views/Home.vue'
// import User from "../views/User.vue";

// 路由懒加载  第一种写法
const Home = () => import('../views/Home.vue');
const User = () => import('../views/User.vue');

// 1.通过Vue.use(插件),安装插件
Vue.use(VueRouter)

// 映射关系
const routes = [
  {
    // 默认路径
    path:'/',
    // redirect 重定向
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    // 路由元信息 (描述数据的数据)  加meta属性
    meta: { 
      title:"首页"
    },
    component: Home,
    children:[
      // {
      //   // 默认显示新闻  
      //   // keep-alive:keep-alive用于保存组件的渲染状态。
      //   path:'',
      //   redirect: 'news'
      // },
      {
        // 子路由的path不加 '/'
        path:'news',
        component: () => import('../components/HomeNews.vue') 
      },
      {
        path:'msg',
        component: () => import('../components/HomeMsg.vue') 
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // 路由元信息
    meta: { 
      title:"关于"
    },
    // 路由独享的守卫  路由管道钩子
    beforeEnter: (to, from, next) => {
      console.log(to);
      console.log("路由独享守卫  路由管道钩子");
      next();
    },
    // 路由懒加载  第二种写法
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/user/:userid',// 动态路由匹配  在 app.vue   <router-link :to="'/user/'+user">登陆</router-link>  动态获取 user:"lisi"
    name:'User',
    // 路由元信息
    meta: { 
      title:"用户"
    },
    component: User
  },
  {
    path:'/profile',
    // profile这里没有定义meta属性   所以title不能显示
    component:()=>import('../views/Profile.vue')
  }
]

// 2.创建VueRouter对象
const router = new VueRouter({
  // mode  模式   HTML5:history模式
  mode: 'history',// 如果路由选着yes  这里需要配置history
  base: process.env.BASE_URL,

  // 配置路由和组件之间的应用关系
  routes,  //(缩写) 相当于 routes: routes
  // linkActiveClass  设置App.vue里面</router-link>  设置修改router-link-active的class名字    
  // 通过linkActiveClass修改router-link-active的class名字
  linkActiveClass:"active"
})

// 全局前置守卫
// router.beforeEach(function(to,from,next){})
/*
  导航钩子的三格参数解析
    to:即将要进入的目标的路由对象
    from:当前导航即将要离开的路由对象
    next:调用该方法后,才能进入下一个钩子 
*/
// 前置守卫(钩子hook) 跳转前回调
router.beforeEach((to, from, next) => {
  // 从from到to  to是router
  console.log(to);
  // document.title = to.meta.title;// 不能全部实现
  document.title = to.matched[0].meta.title;// 如果嵌套子路由必须取matched[0] 第一个  实现title更改
  console.log("++++++++");
  next();// next();  *必须调用*  如果不调用next()什么都不可以跳转
})
// 后置钩子   跳转后回调
// 后置钩子已经跳转完毕,不需要主动调用next()函数
router.afterEach((to, from) => {
  console.log('---------------------');

})

// 使用this.$router.push(this.path)报错  虽不影响结果  但是有个红叉  得改
// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }

// 3.将router对象传入到Vue实例  导出
export default router 

