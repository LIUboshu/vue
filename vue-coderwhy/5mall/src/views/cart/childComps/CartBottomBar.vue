<template>
    <div class="cart-bottom-bar">
        <div class="cartChecked">
            <check-button :is-change='isSelectAll' @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="cartTotal">
            <span>合计:</span>
            <span>¥{{totalPrice}}</span>
        </div>
        <div class="cartSettlement" @click="calcClick">
            去结算({{checkLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
    name:'CartBottomBar',
    components: {
        CheckButton
    },
    computed: {
        totalPrice(){
            return this.$store.state.cartList.filter(function(item){
                return item.checked
            }).reduce(function(total,item){
                return total + (item.price * item.count)
            },0)
        },
        checkLength(){
            return this.$store.state.cartList.filter(item => item.checked).length;
        },
        isSelectAll(){
            /* 
            // filter(item => !item.checked)这里找的是  不选中的
            //  数字取反  == false
            return !(this.$store.state.cartList.filter(item => !item.checked).length)
            */
            if(this.$store.state.cartList.length === 0) return false;
            return !this.$store.state.cartList.find(item => !item.checked);
        }
    },
    methods: {
        checkClick(){
            if(this.isSelectAll){ // 这里是全部选中
                return this.$store.state.cartList.forEach(item => item.checked = false);
            } else{
                return this.$store.state.cartList.forEach(item => item.checked = true);
            }

            // this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll);// 这个简化不可以
        },
        calcClick(){
            if(!this.isSelectAll){
                this.$toast.show('请选择购买的商品');
            }
        }
    }
}
</script>

<style lang="less" scoped>
.cart-bottom-bar{
    height: 40px;
    display: flex;
    background-color: #eee;
    .cartChecked,.cartTotal,.cartSettlement{
        line-height: 40px;
    }
    .cartChecked{
        display: flex;
        flex: 1;
        align-items: center;
        margin-left: 5px;
        .CheckButton{
            width: 20px;
            height: 20px;
            line-height: 20px;
        }
    }
    .cartTotal{
        flex: 2;
    }
    .cartSettlement{
        flex: 1;
        background-color: red;
        text-align: center;
        color: white;
    }
}

</style>