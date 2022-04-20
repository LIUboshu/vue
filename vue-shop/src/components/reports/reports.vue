<template>
    <div class="reports">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <!-- 下载依赖 cnpm install echarts --save -->
        <el-card class="box-card">
            <div id="main" style="width: 750px;height:400px;"></div>
        </el-card>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { getReports } from "network/reports.js";
import _ from "lodash";
export default {
    data () {
        return {
            // 需要合并数据
            options: {
                title: {
                text: '用户来源'
                },
                tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                    backgroundColor: '#E9EEF3'
                    }
                }
                },
                grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
                },
                xAxis: [
                {
                    boundaryGap: false
                }
                ],
                yAxis: [
                {
                    type: 'value'
                }
                ]
            },
            datas:{}
        }
    },
    created () {
    },
    async mounted () {
        var myChart = echarts.init(document.getElementById('main'));
        /* getReports().then(res=>{
            console.log(res);
            this.datas = res.data.data
             console.log(this.datas);
        }) */
        const { data : res} = await this.$http.get("reports/type/1")
        console.log(res.data)
        // lodash的merge合并方法
        const result = _.merge(res.data,this.options);
        myChart.setOption(result);


        // 指定图表的配置项和数据
        // var option = {
        //     title: {
        //     text: 'ECharts 入门示例'
        //     },
        //     tooltip: {},
        //     legend: {
        //     data: ['销量']
        //     },
        //     xAxis: {
        //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        //     },
        //     yAxis: {},
        //     series: [
        //     {
        //         name: '销量',
        //         type: 'bar',
        //         data: [5, 20, 36, 10, 10, 20]
        //     }
        //     ]
        // };

        // // 使用刚指定的配置项和数据显示图表。
        // myChart.setOption(option);


    },
    methods: {
        /* 
            最后优化:
                切换时出现进度条
                cnpm install --save nprogress
                在 
                // 导入Nprogress包对应的js/css
                import Nprogress from "nprogress";
                import "nprogress/nprogress.css";
        */
    }
}
</script>

<style lang="less" scoped>


</style>