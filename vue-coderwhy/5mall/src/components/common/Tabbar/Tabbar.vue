<template>
    <div class="tabbar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'Tabbar',
    data () {
        return {
            
        }
    },
    components: {

    }
}
</script>

<style lang="less">
    .tabbar{
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 49px;
        background-color: #f9f9f9;
        box-shadow: 0 -1px 1px rgba(100,100,100,.2);
        font-size: 14px;
        
    }
</style>