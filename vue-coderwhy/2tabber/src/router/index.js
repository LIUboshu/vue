import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>import('../views/home/Home.vue')
const Profile = () =>import('../views/profile/profile.vue')
const Cart = () =>import('../views/cart/Cart.vue')
Vue.use(VueRouter)

// 解决导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  	return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path:'',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/category/About.vue')
  },
  {
    path: '/cart',
    name: 'Catr',
    component: Cart
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
