<template>
  <div id="home">
      <nav-bar class="home-navbar">
        <div slot="center">购物街</div>
      </nav-bar>
      <tab-control 
        :tabControl='["流行","新款","精选"]' @tabContril-click='tabContrilclick' 
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed"/>
      <scroll class="content" 
        ref="scroll" 
        :probetype='3' 
        @scrolls='contentScroll' 
        :pull-up-load='true'
        @pullingUp='loadMore'>
        
        <Home-swiper :bannersss="banners" @swiperImageLoad='swiperImageLoad'></Home-swiper>
        <recommend-view :recommends='recommends'></recommend-view>
        <feature-view></feature-view>
        <tab-control 
          :tabControl='["流行","新款","精选"]' @tabContril-click='tabContrilclick' 
          ref="tabControl2"></tab-control>
        <goods-list :goodsList='goods[goodsType].list'></goods-list>
        
      </scroll>
      <!-- vue的组件进行监听点击事件是无效的,只要加上.native修饰符就行了 -->
      <!-- click不能再组件上直接监听必须加上native   不能监听,必须加native -->
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import navBar from 'components/common/navbar/navBar.vue'
import tabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import recommendView from "./childComps/recommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";
// 没有加default  就需要加{}
import {getHomeMultidata,getHomeTabControl} from 'network/home.js'
import { debounce } from "common/utils";// 防抖
import { itemListenerMixin } from "common/mixin.js";
export default {
  name:"home",
  mixins: [itemListenerMixin],//混入
  data () {
    return {
      // 定义变量把数据保存起来
      banners:[],
      recommends:[],
      goodsType:'pop',
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      scrollY:0,
    }
  },
  components:{
    navBar,
    tabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    recommendView,
    FeatureView
  },
  created () {
    // 1. 请求多个数据
    this.getHomeMultidata();
    // 2. 请求商品数据
    this.getHomeTabControl('pop');
    this.getHomeTabControl('new');
    this.getHomeTabControl('sell');
    
  },
  mounted () {
    // 防抖函数调用  优化性能
    const refresh = this.debounce(this.$refs.scroll.refresh,100);

    // 对监听事件进行保存
    this.$bus.$on('itemIamgeLoad',()=>{
      refresh();
    })
    // this.$bus.$on('itemIamgeLoad',this.itemImgListenter);
    
    // 3.事件总线  监听item中图片加载完成
    /* 
      // 在cerate里面有可能拿不到$refs.scroll
      
      //console.log("监听item中图片加载完成");
      this.$refs.scroll.refresh();// 这个实行频率很高
      // 这里如果不用.scroll.refresh();    可以在scroll.vue中增加observeDOM  observeImage设置true 也能修改掉bug

      console.log('-----refresh()函数调用的太过于频繁--------')
    */
    

    // 赋值  获取tabControl的offsetTop
    // 所有的组件都有一个属性:$el  用于获取组件中的元素
    // console.log(this.$refs.tabControl2.$el.offsetTop);//为了获取准确的OffsetTop值  必须监听图片是否加载完毕
    // this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    
  },
  activated () { 
    // 在 keep-alive 组件激活时调用  该钩子函数在服务器端渲染期间不被调用
    // console.log('activated 活跃');
    this.$refs.scroll.scrollTo(0,this.scrollY);
    this.$refs.scroll.refresh();// 最好刷新一次
  },
  deactivated () {
    // 在 keep-alive 组件停用时调用  该钩子在服务器端渲染期间不被调用
    // console.log('deactivated 停用');
    // 1. 离开的时候  保存Y值
    this.scrollY = this.$refs.scroll.getScrollY();
    // console.log(this.scrollY)
    // 2.取消全局事件的监听  this.$bus是全局变量
    // 非父子组件监听   事件总线  $bus
    this.$bus.$off('itemIamgeLoad',this.itemImgListenter);// 混入
  },
  methods: {
    
    //防抖函数   防抖函数的使用场景： 频繁触发、输入框搜索
    debounce(func,delay){
      let timer = null;// 用这个timer记录有没有定时器
      return function(...args){ //函数本身返回一个新的函数 ...args可以传入多个参数
        if(timer){
          clearTimeout(timer);
        }
        timer = setTimeout(()=>{
          func.apply(this,args);
        },delay);
      }
    },
    
    // 方法
    tabContrilclick(index){
      switch (index) {
        case 0:
          this.goodsType = 'pop'
          break;
        case 1:
          this.goodsType = 'new'
          break;
        case 2:
          this.goodsType = 'sell'
          break;
      }
      // tabControl 吸顶  切换保持一致
      this.$refs.tabControl1.tabContrilIndex = index;
      this.$refs.tabControl2.tabContrilIndex = index;
    },
    backClick(){
      // 返回顶部
      // this.$refs.scroll.scroll.scrollTo(0,0);
      //回到顶部  去scroll.vue 里面有一个scrollTo()方法
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      // 大于1000 显示   判断返回顶部是否显示
      // console.log(position);
      this.isShowBackTop = (-position.y) > 1000;

      // 判断 tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    loadMore(){
      // 上拉加载
      this.getHomeTabControl(this.goodsType);
      // 开始图片没有加载进来没有算图片的高度,现在图片过来需要重新计算高度
      // refresh()刷新，保留之前的缓存内容，重新加载页面，之前存在的东西不会动，没加载上来的东西继续加载，也会去加载后台代码内容的。

      //this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad(){
      // 这里只需要调用一次
      console.log(this.$refs.tabControl2.$el.offsetTop);//为了获取准确的OffsetTop值  必须监听图片是否加载完毕
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 网络请求
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        // console.log(res.data);
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list
      })
    },
    getHomeTabControl(type){
      const page = this.goods[type].page + 1;
      getHomeTabControl(type,page).then(res=>{
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();//添加finishPullUp方法后  就会重新上拉加载更多----
      })
    }
  }
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-navbar{
  
  background-color: #ff8198;
  color: #ffffff;
  /* 在使用浏览器原生滑动时,为了让导航不跟随一起滚动*/
 /*  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999999999; */
}
.tab-control{
  position: relative;
  z-index: 9;
}
/* .fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>