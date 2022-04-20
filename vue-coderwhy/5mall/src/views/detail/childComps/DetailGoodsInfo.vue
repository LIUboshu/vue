<template>
    <div class="GoodsInfo">
        <div class="info-desc">
            <div class="start"></div>
            <div class="desc">{{goodsInfo.desc}}</div>
            <div class="end">{{imagesLength}}</div>
        </div>
        <div class="info-key">{{goodsInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="(item,index) in goodsInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name:'DetailGoodsInfo',
    props: {
        goodsInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data () {
        return {
            counter:0 ,
            imagesLength:0     
        }
    },
    methods: {
        imgLoad(){
            // 判断,所有的图片加载完了,那么进行一次回调就可以

            this.counter += 1
            if(this.counter === this.imagesLength){
                this.$emit('imageLoad');
            }

            // if(++this.counter === this.imagesLength){
            //     this.$emit('imageLoad');
            // }

            // this.$emit('imageLoad');
        }
    },
    watch: {
        goodsInfo(){
            this.imagesLength = this.goodsInfo.detailImage[0].list.length
        }
    }
}
</script>

<style lang="less" scoped>
.GoodsInfo{
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
    width: 100%;
    .info-list{
        img{
            width: 100%;
        }
    }
}
</style>