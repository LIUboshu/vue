<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
    name:"Scroll",
    props: {
        probetype:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
        
    },
    data () {
        return {
            scroll:null
        }
    },
    // updated () {
    //     var that = this;
    //     // 1.创建BScroll对象
    //     this.scroll = new BScroll(this.$refs.wrapper,{
    //         click:true,
    //         probeType:this.probetype
    //     });
    //     // this.scroll.scrollTo(0,0);
    //     // 2.监听滚动的位置
    //     this.scroll.on('scroll',function(position){
    //         // console.log(position);
    //         // console.log(that)
    //         that.$emit('scrolls',position);
    //     })
    // },
    methods: {
        scrollTo(x,y,time=500){
            // 严谨写法  this.scroll && this.scroll.scrollTo &&
            this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp();
        },
        refresh(){
            console.log('----不会频繁的调用,说明防抖动成功------');// 本次打印不是30张图片,防抖动成功
            this.scroll && this.scroll.refresh();
        },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0;
        }
    },
    mounted () {
        var that = this;
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            observeDOM:true,
            observeImage:true,
            // observeDOM  observeImage设置true  解决 组件goods-list图片加载不过来 不能滚动的问题   这里使用observeDOM  observeImage设置true后  不需要在调用refresh();   不需要$bus 事件总线
            probeType:this.probetype,
            pullUpLoad:this.pullUpLoad     // 上拉加载
        });
        // this.scroll.scrollTo(0,0);
        // 2.监听滚动的位置
        if(this.probeType === 2 && this.probeType === 3){
            this.scroll.on('scroll',function(position){
                // console.log(position);
                // console.log(that)
                that.$emit('scrolls',position);
            });
        }
        // 3.监听上拉加载 scroll滚动到底部
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',() => {
                console.log('滚动到底部');
                this.$emit('pullingUp');
            })
        }
    }
}
</script>

<style>

</style>