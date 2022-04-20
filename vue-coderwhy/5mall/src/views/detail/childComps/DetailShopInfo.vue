<template>
    <div class="shop-info">
        <div class="shop-top">
            <img class="shop-img" :src="shop.logo" alt="">
            <span class="title">{{shop.name}}</span>
        </div>
        <div class="shop-middle">
            <div class="shop-middle-item shop-middle-left">
                <div class="info-sells">
                    <div class="sells-count">
                        {{shop.sells | filterShop}}
                    </div>
                    <div class="sells-text">总销量</div>
                </div>
                <div class="info-goods">
                    <div class="goods-count">
                        {{shop.goodsCount}}
                    </div>
                    <div class="goods-text">全部宝贝</div>
                </div>
            </div>
            <div class="shop-middle-item shop-middle-right">
                <table>
                    <tr v-for="(item,index) in shop.score" :key="index">
                        <td>{{item.name}}</td>
                        <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
                        <td class="better" :class="{'better-more':item.isBetter}">
                            <span>{{item.isBetter ? '高' : '低' }}</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="shop-bottom">
            <div class="enter-shop">进店逛逛</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'DetailShopInfo',
    props: {
        shop:{
            type:Object,
            default(){
                return{}
            }
        }
    },
    data () {
        return {
            num:0
        }
    },
    updated () {
        this.num = this.shop.sells;
        // console.log(this.num)
    },
    filters: {
        filterShop(value){
           return value > 10000 ? (value/10000).toFixed(2) + "万" : value
        }
    }
}
</script>

<style lang="less">
.shop-info{
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
    background-color: white;
    .shop-top{
        line-height: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        img{
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border-right: 1px solid rgba(0,0,0,.1);
        }
        .title{
            margin-left: 10px;
            vertical-align: center;
        }
    }
    .shop-middle{
        display: flex;
        .shop-middle-item{
            flex: 1;
        }
        .shop-middle-left{
            display: flex;
            justify-content: space-evenly;
            color: #333;
            text-align: center;
            border-right: 1px solid rgba(0,0,0,.1);
            .info-sells,.info-goods{
                margin-top: 10px;
            }
            .sells-count,.goods-count{
                font-size: 18px;
            }
            .sells-text,.goods-text{
                margin-top: 10px;
                font-size: 12px;
            }
        }
        .shop-middle-right{
            font-size: 13px;
            color: #333;
            table{
                width: 120px;
                margin-left: 30px;
                td{
                    padding: 5px 0;
                }
                .better-more{
                    span{
                        background-color: red !important;
                    }
                }
                .score-better{
                    color: red !important;
                }
                .score{
                    color: #5ea732;
                }
                .better{
                    span{
                        background-color: #5ea732;
                        color: #fff;
                        text-align: center;
                    }
                }
            }
        }
    }
    .shop-bottom{
        .enter-shop{
            margin: 2px auto;
            text-align: center;
            line-height: 30px;
            width: 100px;
            height: 30px;
            background-color: #ccc;
            border-radius: 15px;
            color: #fff;
        }
    }
}
</style>