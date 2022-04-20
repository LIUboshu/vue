<template>
    <div class="tabControl">
        <div class="controlItem" v-for="(item,index) in tabControl" :key="index" @click="tabContril(index)">
            <span :class="{active:tabContrilIndex == index}">{{ item }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:"TabControl",
    props: {
        tabControl:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data () {
        return {
            tabContrilIndex:0
        }
    },
    methods: {
        tabContril(index){
            this.tabContrilIndex = index;
            this.$emit('tabContril-click',index)
        }
    }
}
</script>

<style lang="less" scoped>
.tabControl{
    display: flex;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    height: 40px;
    background-color: white;
    .controlItem{
        flex: 1;
        justify-content: space-around;
    }
}
.active{
    color: #ff8198;
    padding: 3px;
    border-bottom: 2px solid #ff8198;
}
</style>