<template>
    <div class="TabbarItem" @click="tabClick">
        <div v-if="!isActive">
            <slot name='item-icon'></slot>
        </div>
        <div v-else>
            <slot name='item-icon-active'></slot>
        </div>
        <div :class="{active:isActive}">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'TabbarItem',
    props: {
        path:{
            type:String
        }
    },
    data () {
        return {
            
        }
    },
    computed: {
      isActive(){
          // 没有找到返回-1   !== -1 说明找到了  true
          return this.$route.path.indexOf(this.path) !== -1
      }  
    },
    methods: {
        tabClick(){
            this.$router.push(this.path)
        }
    }
}
</script>

<style lang="less">
    .TabbarItem{
        flex: 1;
        justify-self: flex-end;
        text-align: center;
        img{
            margin-top: 2px;
            width: 24px;
            height: 24px;
            display: inline-block;
            margin-bottom: 2px;
            vertical-align: middle;
        }
    }
    .active{
        color: red;
    }
</style>