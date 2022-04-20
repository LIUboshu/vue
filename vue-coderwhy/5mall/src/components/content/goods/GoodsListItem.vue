<template>
    <div class="GoodsListItem" @click="itemClick">
        <!-- 这里用了vue-lazyload插件  图片懒加载   需要把:src 换成 v-lazy -->
        <!-- <img :src="goodsImg" alt="" @load="imageLoad"> -->
        <img v-lazy="goodsImg" alt="" @load="imageLoad">
        <!-- @load 监听图片加载完 -->
        <div class="goodsInfo">
            <p>{{ goodsListItem.title }}</p>
            <span class="price">{{goodsListItem.price}}</span>
            <span class="collect">{{goodsListItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:"GoodsListItem",
    props: {
        goodsListItem:{
            type:Object,
            default(){
                return{}
            }
        }
    },
    computed: {
        goodsImg(){
            return this.goodsListItem.image || this.goodsListItem.show.img;
        }
    },
    methods: {
        imageLoad(){
            // 非父子组件监听   事件总线  $bus
            this.$bus.$emit('itemIamgeLoad');// 通过$bue new Vue()实例来发射事件   事件总线

            /* if(this.$route.path.indexOf('/home') != -1){
                // 非父子组件监听   事件总线  $bus
                this.$bus.$emit('homeitemIamgeLoad');// 通过$bue new Vue()实例来发射事件   事件总线
            } else if(this.$route.path.indexOf('/detail')){
                this.$bus.$emit('detailIamgeLoad');
            } */
        },
        itemClick(){
            console.log(this.goodsListItem);
            this.$router.push("/detail/" + this.goodsListItem.iid);
        }
    }
}
</script>

<style lang="less" scoped>
.GoodsListItem{
    border-radius: 5px;
    width: 48%;
    
    img{
        width: 100%;
        border-radius: 5px;
    }
    .goodsInfo{
        font-size: 12px;
        text-align: center;
        p{
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        .price{
            color: #ff8198;
            margin-right: 20px;
        }
        .collect::before{
            content: '';
            left: -15px;
            top: -1px;
            width: 14px;
            height: 14px;
            background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
        }
    }
}
</style>