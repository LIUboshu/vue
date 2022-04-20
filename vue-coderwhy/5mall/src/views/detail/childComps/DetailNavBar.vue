<template>
    <div class="DetailNavBar">
        <d-nav-bar>
            <div slot="left" class="left" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="center">
                <div v-for="(item,index) in title" :key="index" @click="itemClick(index)" :class="{active : currentIndex === index}">
                    {{item}}
                </div>
            </div>
        </d-nav-bar>
    </div>
</template>

<script>
import dNavBar from 'components/common/navbar/navBar.vue'
export default {
    name:"DetailNavBar",
    data () {
        return {
            title:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    components: {
        dNavBar
    },
    methods: {
        itemClick(index){
            this.currentIndex = index;
            this.$emit('navItemClick',index);
        },
        backClick(){
            this.$router.back();
            // 后退1
            // this.$router.go(-1);
        }
    }
}
</script>

<style lang="less" scoped>
.DetailNavBar{
    .left{
        img{
            // margin-top: 10px;
            vertical-align: middle;
        }
    }
    .center{
        display: flex;
        div{
            flex: 1;
            font-size: 13px;
        }
        .active{
            color: #ff8198;
        }
    }
}

</style>