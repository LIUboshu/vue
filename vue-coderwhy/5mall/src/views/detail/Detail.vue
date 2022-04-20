<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" ref="navbar" @navItemClick='navItemClick'></detail-nav-bar>
        <!-- 
            probetype  默认是个0   0的时候不监听滚动
            这里probetype  改成3   所有滚动都监听
         -->
        <scroll class="content" ref="scroll" :probetype='3' @scrolls='scrolls'>
            <detail-swiper :top-imagess='topImages'/>
            <detail-base-info :goods='goods'/>
            <detail-shop-info :shop="shop" />
            <detail-goods-info :goods-info='goodsInfo' @imageLoad='imageLoad'/>
            <detail-param-info ref="param" :param-info='goodsParam'/>
            <detail-comment-info ref="comment" :comment-info='commentInfo'/>
            <goods-list ref="recommend" :goods-list='recommends'/>
        </scroll>
        <detail-bottom-bar @addCart='addToCart'/>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
        <!-- <toast :msg='msgg' :isShow='isShow'></toast> -->
    </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
import DetailBottomBar from "./childComps/DetailBottomBar.vue"
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import { getDetail,Goods,Shop,goodsParam,getRecommend } from "network/detail.js";
import { itemListenerMixin } from "common/mixin.js";

import { mapActions } from "vuex";


// import Toast from "components/common/toast/Toast.vue";

export default {
    name:"Detail",
    mixins: [itemListenerMixin],
    data () {
        return {
            iid:null,
            topImages:[],  // 获取顶部轮播图数据
            goods:{},   // 获取商品信息
            shop:{},    // 创建店铺信息的对象
            goodsInfo:{     // 创建店铺信息的对象
                detailImage:[
                    0
                ]
            },
            goodsParam:{},  // 获取商品的参数信息
            commentInfo:{   // 获取评论数据
                user:{
                    avatar:{}
                }
            },
            recommends:[],  // 获取推荐信息
            themeTopYs:[],  // 顶部导航
            currentIndex:0,
            isShowBackTop:false,
            // msgg:'',
            // isShow:false
            
        }
    },
    created () {
        // 1.保存传入的iid
        this.iid = this.$route.params.iid;
        // 2.根据iid请求详情数据
        getDetail(this.iid).then(res=>{
            // console.log(res);
            const data = res.data.result;
            // 1. 获取顶部轮播图数据
            this.topImages = data.itemInfo.topImages;
            // 2. 获取商品信息
            let goodsItem = new Goods(data.columns,data.itemInfo,data.shopInfo.services);
            this.goods = goodsItem;
            // 3.创建店铺信息的对象
            let shopItem = new Shop(data.shopInfo);
            this.shop = shopItem;
            // 4.保存商品的详情数据
            this.goodsInfo = data.detailInfo;
            // 5.获取商品的参数信息
            this.goodsParam = new goodsParam(data.itemParams.info,data.itemParams.rule);
            // 6.获取评论数据
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0];
            }

            //Vue生命周期的created()/mounted()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
            /* this.$nextTick(()=>{
                // $nextTick不可以是因为图片的高度没有计算在内
                this.themeTopYs= [];
                this.themeTopYs.push(0);
                this.themeTopYs.push(-(this.$refs.param.$el.offsetTop));
                this.themeTopYs.push(-(this.$refs.comment.$el.offsetTop));
                this.themeTopYs.push(-(this.$refs.recommend.$el.offsetTop));
                console.log(this.themeTopYs)
            }) */
        })
        // 3.获取推荐信息
        getRecommend().then(res=>{
            this.recommends = res.data.data.list;
        })
       
       
    },
    /* updated () {
        // 过于频繁 打印多次
        this.themeTopYs= [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(-(this.$refs.param.$el.offsetTop));
        this.themeTopYs.push(-(this.$refs.comment.$el.offsetTop));
        this.themeTopYs.push(-(this.$refs.recommend.$el.offsetTop));
        console.log(this.themeTopYs)
    }, */
    methods: {
        ...mapActions(['addCart']),
        swiperImageLoad(){
            this.$refs.scroll.refresh();
        },
        imageLoad(){
            this.$refs.scroll.refresh();
            // 图片加载完成后,获取的高度才是正确的
            // 做防抖  或者这 判断
            this.themeTopYs= [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(-(this.$refs.param.$el.offsetTop)+ 44);
            this.themeTopYs.push(-(this.$refs.comment.$el.offsetTop)+44);
            this.themeTopYs.push(-(this.$refs.recommend.$el.offsetTop)+44);
            // console.log(this.themeTopYs)
        },
        navItemClick(index){
            this.$refs.scroll.scrollTo(0,this.themeTopYs[index])
        },
        scrolls(position){
            // onsole.log(position.y);
            // [0, -12942, -14013, -14369] 和 themeTopYs作对比
            // themeTopYs 在0和-12942 之间 index = 0
            // themeTopYs 在-12942 和-14013 之间 index = 1
            // themeTopYs 在-14013和-14369 之间 index = 2
            // themeTopYs 小于-14369 index = 3
            let length = this.themeTopYs.length;
            for (let i = 0; i < length; i++) {
                // 条件一:过于频繁
                if(this.currentIndex !== i && ((i < length -1 && position.y <= this.themeTopYs[i] &&  position.y >= this.themeTopYs[i+1]) || (i === length - 1 && position.y <= this.themeTopYs[i]))){
                    this.currentIndex = i;
                    this.$refs.navbar.currentIndex = this.currentIndex;
                }
                
            }
            //// 大于1000 显示   判断返回顶部是否显示
            this.isShowBackTop = (-position.y) > 1000;
        },
        backClick(){
            // 返回顶部
            // this.$refs.scroll.scroll.scrollTo(0,0);
            this.$refs.scroll.scrollTo(0,0)
        },
        addToCart(){
            // 1. 获取购物车需要展示的信息
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc; 

            product.price = this.goods.realPrice;
            product.iid = this.iid;

            /* 
            // 2.将商品添加到购物车  vuex  第一种方法
            // 修改任何 state 里面的信息都必须通过mutations
            this.$store.dispatch('addCart',product).then(res=>{
                // 添加购物车成功  Toast
                console.log(res);
                // 如果在vuex里面做了某个操作,想让外面知道完成了这个操作这里需要用到promise
            })
            */

           // 2.将商品添加到购物车  vuex  第二种方法  ...mapActions
           this.addCart(product).then(res=>{
            //    console.log(res);
            //    this.msgg = res;
            //    this.isShow = true;
            //    setTimeout(()=>{
            //        this.isShow = false
            //    },2000)


            this.$toast.show(res,1500)
           })
        }
    },
    destroyed () {//事件销毁
        // // 非父子组件监听   事件总线  $bus    this.$bus是全局变量
        this.$bus.$off('itemIamgeLoad',this.itemImgListenter);//混入
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        GoodsList,
        Scroll,
        BackTop
        // Toast
    }
}
</script>

<style lang="less" scoped>
#detail{
    background-color: white;
    height: 100vh;
    z-index: 9;
    position: relative;
    .detail-nav{
        position: relative;

        z-index: 9;
    }
    .content{
        // position: relative;
        height: calc(100% - 44px - 58px);
        overflow: hidden;
        z-index: 10;
        // background-color: white;
        ul{
            background-color: white;
        }
    }
}
</style>