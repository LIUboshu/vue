<template>
    <div class="CartListItem">
        <div class="item-selector">
            <!-- 这里选中和不选中   一定要在模型中修改 -->
            <check-button :is-change='product.checked' @click.native='checkClick'></check-button>
        </div>
        <div class="item-img">
            <img :src="product.image" alt="">
        </div>
        <div class="item-info">
            <div class="item-title">{{product.title}}</div>
            <div class="item-desc">{{product.desc}}</div>
            <div class="info-bottom">
                <div class="item-price left">¥{{product.price}}</div>
                <div class="item-count right">x{{product.count}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
    name:'CartListItem',
    props: {
        product:{
            type:Object,
            default(){
                return{}
            }
        }
    },
    components: {
        CheckButton
    },
    methods: {
        checkClick(){
            this.product.checked = !this.product.checked;
        }
    }
}
</script>

<style lang="less" scoped>
.CartListItem{
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    .item-selector{
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .item-img{
        padding: 5px;
        img{
            width: 80px;
            height: 100px;
            display: block;
            border-radius: 5px;
        }
    }
    .item-info{
        font-size: 17px;
        color: #333;
        padding: 5px 10px;
        position: relative;
        overflow: hidden;
        .item-title,.item-desc{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .item-desc{
            font-size: 14px;
            color: #666;
            margin-top: 15px;
        }
        .info-bottom{
            margin-top: 10px;
            position: absolute;
            bottom: 10px;
            left: 10px;
            right: 10px;
            .item-price{
                color: orangered;
            }
        }
    }
}
</style> 