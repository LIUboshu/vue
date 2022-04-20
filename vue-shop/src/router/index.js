import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () =>import('../views/Login/login.vue');
const Home = () =>import('../views/home/Home.vue');
const Welcome = () =>import('../views/home/welcome/Welcome.vue');
const Users = () =>import('../components/users/Users.vue');
const Rights = () =>import('../components/rights/Rights.vue');
const Roles = () =>import('../components/roles/Roles.vue');
const Categories = () =>import('../components/goods/categories.vue');
const Goods = () =>import('../components/goods/goods.vue');
const Params = () =>import('../components/goods/params.vue');
const Add = () =>import('../components/goods/add.vue');
const Orders = () =>import('../components/orders/orders.vue');
const Reports = () =>import('../components/reports/reports.vue');
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/login'
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/home',
    name:"Home",
    component:Home,
    redirect:'/welcome',
    children:[
      {
        path:'/welcome',
        name:'Welcome',
        component:Welcome
      },{
        path:'/users',
        name:"Users",
        component:Users
      },{
        path:'/rights',
        name:'Rights',
        component:Rights
      },{
        path:'/roles',
        name:'Roles',
        component:Roles
      },{
        path:'/categories',
        name:'Categories',
        component:Categories
      },{
        path:'/goods',
        name:'Goods',
        component:Goods
      },{
        path:'/goods/add',
        name:'Add',
        component:Add
      },{
        path:'/params',
        name:'Params',
        component:Params
      },{
        path:'/orders',
        name:'Orders',
        component:Orders
      },{
        path:'/reports',
        name:'Reports',
        component:Reports
      }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from 代表从那个路径跳转而来
  // next 是一个函数,表示放行
  // next() 放行   next('/home')强行跳转

  if(to.path === '/login') return next();
  
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr){
    next('/login');
  }else{
    next();
  }
})

export default router
