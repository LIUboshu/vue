<template>
    <div class="DetailParamInfo" v-if="Object.keys(paramInfo).length !== 0">
        <table>
            <tr v-for="(tr,index) in paramInfo.rule[0]" :key='index'>
                <td  v-for="(td,index) in tr" :key='index'>{{td}}</td>
            </tr>
        </table>
        <table>
            <tr v-for="(info,index) in paramInfo.info" :key='index'>
                <td class="info-param-key">{{info.key}}</td>
                <td class="param-value">{{info.value}}</td>
            </tr>
        </table>
        <div class="info-img">
            <img :src="paramInfo.images" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name:'DetailParamInfo',
    props: {
        paramInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style lang="less" scoped>
.DetailParamInfo{
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
    table{
        width: 100%;
        border-collapse: collapse;
        tr{
            height: 42px;
            border-bottom: 1px solid #f2f5f8;
            .info-param{
                border-top: 1px solid rgba(0,0,0,.1);
            }
            .info-param-key{
                width: 95px;
            }
            .param-value{
                color: #eb4868;
            }
            td{
                border-bottom: 1px solid rbga(100,100,100,.1);
            }
        }
    }
    .info-img{
        img{
            width: 100%;
        }
    }
}
</style>