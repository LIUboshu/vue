<template>
    <Swiper>
        <Swiper-item v-for="(item,index) in bannersss" :key="index">
            <a :href="item.link">
                <img :src="item.image" :alt="item.title" @load="imageLoad">
            </a>
        </Swiper-item>
    </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
    name:"HomeSwiper",
    props: {
        bannersss:{
            type:Array,
            default(){
                return[]
            }
        }
    },
    data () {
        return {
            isLoad:false
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
        imageLoad(){
            //  这里只需要获取一次 轮播图   图片的高度
            if(!this.isLoad){
                this.$emit('swiperImageLoad');
                this.isLoad = true;
            }
        }
    }
}
</script>

<style>

</style>