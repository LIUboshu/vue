<template>
    <div v-if="Object.keys(goods).lenght !== 0" class="DetailBaseInfo">
        <div class="info-title">{{goods.title}}</div>
        <div class="info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
        </div>
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[1].name}}</span>
        </div>
        <div class="info-service">
            <div class="info-service-item" v-for="index in goods.services.length-1" :key='index'>
                <img :src="goods.services[index-1].icon" alt="">
                <span >{{goods.services[index-1].name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"DetailBaseInfo",
    props: {
        goods:{
            type:Object,
            default(){
                return{}
            }
        }
    },
    data () {
        return {
            
        }
    }
}
</script>

<style lang="less" scoped>
.DetailBaseInfo{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
    .info-title{
        color: #222;
    }
    .info-price{
        margin-top: 10px;
        .n-price{
            font-size: 24px;
            color: #ff8198;
        }
        .o-price{
            font-size: 13px;
            margin-left: 5px;
            text-decoration: line-through;
        }
        .discount{
            background-color: #ff8198;
            padding: 4px 8px;
            border-radius: 12px;
            color: white;
            font-size: 12px;
            margin-left: 10px;
        }
    }
    .info-other{
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        span{
            display: block;
            font-size: 12px;
            margin-top: 2px;
            // flex: 1;
            // text-align: center;
        }
    }
    .info-service{
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        .info-service-item{
            img{
                width: 12px;
                height: 12px;
                vertical-align: middle;
            }
            span{
                font-size: 13px;
                color: #333;
            }
        }
    }
}
</style>