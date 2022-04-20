<template>
    <swiper class="detailSwiper">
        <swiper-item v-for="(item,index) in topImagess" :key="index">
            <img :src="item" alt="" @load="imageLoad">
        </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
    name:'DetailSwiper',
    data () {
        return {
            isLoad:false
        }
    },
    props: {
        topImagess:{
            type:Array,
            default(){
                return[]
            }
        }
    },
    components: {
        Swiper, SwiperItem
    },
    methods: {
        
        imageLoad(){
            if(!this.isLoad){
                this.$emit('swiperImageLoad');
                this.isLoad = true;
            }
            
        }
    }
}
</script>

<style lang="less" scoped>
.detailSwiper{
    height: 300px;
}

</style>