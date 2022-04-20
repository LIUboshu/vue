<template>
    <div class="GoodsList">
        <goods-list-item v-for="(item,index) in goodsList" :key="index" :goods-list-item='item'></goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
    name:"GoodsList",
    props: {
        goodsList:{
            type:Array,
            default(){
                return[]
            }
        }
    },
    components: {
        GoodsListItem
    }
}
</script>

<style lang="less" scoped>
.GoodsList{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
</style>