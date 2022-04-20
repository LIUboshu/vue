<template>
    <div class="Toast" v-show="isShow">
        {{message}}
    </div>
</template>

<script>
export default {
    name:'Toast',
    props: {
        // msg:{
        //     type:String
        // },
        // isShow:{
        //     type:Boolean,
        //     default(){
        //         return false
        //     }
        // }
    },
    data () {
        return {
            message:'',
            isShow:false
        }
    },
    methods: {
        show(message='默认文字',duration = 1500){
            // 默认参数
            // duration = duration || 2000
            this.isShow = true;
            this.message = message;
            setTimeout(() => {
                this.isShow = false;
                this.message = '';
            }, duration);
        }
    }
}
</script>

<style lang="less" scoped>
.Toast{
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: rgba(0, 0, 0, .4);
    padding: 8px 15px;
    color: white;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    z-index: 999;
}


</style>