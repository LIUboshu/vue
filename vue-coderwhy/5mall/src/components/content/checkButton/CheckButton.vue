<template>
    <div class="CheckButton" :class="{check:isChange}">
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
export default {
    name:'CheckButton',
    props: {
        isChange:{
            type:Boolean,
            default:false   //这里需要修改模型   不要在这里修改true 或者false
        }
    }
}
</script>

<style lang="less" scoped>
.CheckButton{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #aaa;
}
.check{
    background-color: red;
    border-color: red;
}
</style>