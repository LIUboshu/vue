<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <CartListItem v-for="(item,index) in cartList" :key="index" :product='item'/>
        </scroll>
    </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem.vue";
import { mapGetters } from "vuex";
export default {
    name:'CartList',
    components: {
       Scroll,
       CartListItem
    },
    computed: {
        ...mapGetters(['cartList'])
    },
    methods: {
        
    },
    activated (){
        this.$refs.scroll.refresh()
    }
}
</script>

<style lang="less" scoped>
.cart-list{
    height: calc(100% - 44px - 49px - 40px);
    .content{
        height: 100%;
        overflow: hidden;
    }
}
</style>