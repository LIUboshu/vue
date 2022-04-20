import { debounce } from "common/utils";// 防抖

export const itemListenerMixin = {
    data () {
        return {
            // data里面的变量也可以混入
            itemImgListenter:null
        }
    },
    mounted () {
        const refresh = debounce(this.$refs.scroll.refresh,500);
        this.itemImgListenter = ()=>{
            refresh();
        }
        // 非父子组件监听   事件总线  $bus
        this.$bus.$on('itemIamgeLoad',this.itemImgListenter);
        // console.log("混入.................");
    }
    
}


//返回顶部  mixin抽取(这个没有使用)

import BackTop from "components/content/backTop/BackTop";
export const backTop = {
    data () {
        return {
            isShowBackTop:false
        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick(){
            // 返回顶部
            // this.$refs.scroll.scroll.scrollTo(0,0);
            this.$refs.scroll.scrollTo(0,0)
        }
    }
}