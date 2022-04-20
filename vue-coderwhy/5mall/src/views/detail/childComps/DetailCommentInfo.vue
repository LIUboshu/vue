<template>
    <div class="DetailCommentInfo">
        <div class="info-header">
            <div class="header-title">用户评论</div>
            <div class="header-more">
                更多
                <i class="arrow-right"></i>
            </div>
        </div>
        <div class="info-user">
            <img :src="commentInfo.user.avatar" alt="">
            <span>{{commentInfo.user.uname}}</span>
        </div>
        <div class="info-detail">
            <p>{{commentInfo.content}}</p>
            <div class="info-other">
                <span class="date">{{commentInfo.created | createDate}}</span>
                <span>{{commentInfo.style}}</span>
            </div>
            <div class="info-imgs">
                <img :src="item" alt="" v-for="(item,index) in commentInfo.images" :key="index">
            </div>
        </div>
    </div>
</template>

<script>
import { formatDate } from "common/utils.js";
export default {
    name:'DetailCommentInfo',
    props: {
        commentInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    filters: {
        createDate(value){
            // 1.将时间戳转成Date对象
            const date = new Date(value * 1000);
            // 2.将date进行格式化
            return formatDate(date,'yyyy-MM-dd')
        }
    }
}
</script>

<style lang="less" scoped>
.DetailCommentInfo{
    padding: 5px 12px;
    color: #777;
    border-bottom: 5px solid #f2f5f8; 
    .info-header{
        height: 50px;
        line-height: 50px;
        border-bottom: 5px solid rgba(0,0,0,.1);
        .header-title{
            float: left;
            font-size: 15px;
        }
        .header-more{
            float: right;
            margin-right: 10px;
            font-size: 13px;
        }
    }
    .info-user{
        padding: 10px 0 5px;
        img{
            width: 42px;
            height: 42px;
            border-radius: 50%;
        }
        span{
            position: relative;
            font-size: 15px;
            top: -15px;
            margin-left: 10px;
        }
    }
    .info-detail{
        padding: 0 5px 15px;
        p{
            font-size: 14px;
            color: #777;
            line-height: 1.5;
        }
        .info-other{
            font-size: 12px;
            color: #999;
            margin-top: 10px;
            .date{
                margin-right: 8px;
            }
        }
        .info-imgs{
            margin-top: 10px;
            img{
                width: 70px;
                height: 70px;
                margin-right: 5px;
            }
        }
    }
}

</style>