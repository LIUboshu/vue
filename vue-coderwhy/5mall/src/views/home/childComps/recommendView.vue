<template>
    <div class="recommendView">
        <div class="recommendItem" v-for="(item,index) in recommends" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="">
            </a>
            <div>{{ item.title }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"recommendView",
    props: {
        recommends:{
           type:Array,
            default(){
                return[]
            }
        }
    },
    components: {
        
    }
}
</script>

<style lang="less" scoped>
.recommendView{
    width: 100%;
    display: flex;
    padding: 10px 0 20px;
    border-bottom: 5px solid #f5f5f5;
    .recommendItem{
        flex: 1;
        justify-content: space-around;
        font-size: 12px;
        text-align: center;
        img{
            width: 70px;
            height: 70px;
        }
    }
}
</style>