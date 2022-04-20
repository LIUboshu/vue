<template>
    <div class="orders">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-table border stripe
            :data="orderslist"
            style="width: 100%">
                <el-table-column
                    type="index" label="#">
                </el-table-column>
                <el-table-column
                    property="order_number"
                    label="订单编号">
                </el-table-column>
                <el-table-column
                    prop="order_price"
                    label="订单价格">
                </el-table-column>
                <el-table-column
                    prop="pay_status"
                    label="是否付款">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.pay_status === '1'" type="success">已付款</el-tag>
                        <el-tag v-else type="danger">未付款</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="is_send"
                    label="是否发货">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="下单时间">
                    <template slot-scope="scope">
                        {{scope.row.create_time | createDate}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template>
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="showBox"></el-button>
                        <el-button type="success" size="mini" icon="el-icon-check" @click="showProgressBox"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[5, 10, 15]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-card>
        <!-- 修改地址对话框 -->
        <el-dialog
        title="修改地址"
        :visible.sync="addressVisible"
        width="50%">
            <el-form :model="addressForm" :rules="addressRules" ref="addressRef" label-width="100px" class="demo-ruleForm">
                <el-form-item label="省市区/县" prop="address1">
                    <el-input v-model="addressForm.address1"></el-input>
                </el-form-item>
                <el-form-item label="详细地址" prop="address2">
                    <el-input v-model="addressForm.address2"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addressVisible = false">取 消</el-button>
                <el-button type="primary" @click="addressVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修展示物流进度的对话框 -->
        <el-dialog
        title="物流进度"
        :visible.sync="progressVisible"
        width="50%">
            <el-timeline :reverse="reverse">
                <el-timeline-item
                v-for="(item, index) in activity"
                :key="index"
                :timestamp="item.time">
                {{item.context}}
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
    </div>
</template>

<script>
import { getOrders,getKuaidi } from "network/orders.js";
import { formatDate } from "network/utils.js";
export default {
    data () {
        return {
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:10
            },
            total:0,
            orderslist:[],
            addressVisible:false,
            addressForm:{
                address1:[],
                address2:''
            },
            addressRules:{
                address1:[
                    { required: true, message: '请输入省市区/县', trigger: 'blur' }
                ],
                address2:[
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                ]
            },
            progressVisible:false,
            reverse: true,
            activity: [
                {
                    time: "2018-05-10 09:39:00",
                    ftime: "2018-05-10 09:39:00",
                    context: "已签收,感谢使用顺丰,期待再次为您服务",
                    location: ""
                },
                {
                    time: "2018-05-10 08:23:00",
                    ftime: "2018-05-10 08:23:00",
                    context: "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
                    location: ""
                },
                {
                    time: "2018-05-10 07:32:00",
                    ftime: "2018-05-10 07:32:00",
                    context: "快件到达 [北京海淀育新小区营业点]",
                    location: ""
                },
                {
                    time: "2018-05-10 02:03:00",
                    ftime: "2018-05-10 02:03:00",
                    context: "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
                    location: ""
                },
                {
                    time: "2018-05-09 23:05:00",
                    ftime: "2018-05-09 23:05:00",
                    context: "快件到达 [北京顺义集散中心]",
                    location: ""
                },
                {
                    time: "2018-05-09 21:21:00",
                    ftime: "2018-05-09 21:21:00",
                    context: "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
                    location: ""
                },
                {
                    time: "2018-05-09 13:07:00",
                    ftime: "2018-05-09 13:07:00",
                    context: "顺丰速运 已收取快件",
                    location: ""
                },
                {
                    time: "2018-05-09 12:25:03",
                    ftime: "2018-05-09 12:25:03",
                    context: "卖家发货",
                    location: ""
                },
                {
                    time: "2018-05-09 12:22:24",
                    ftime: "2018-05-09 12:22:24",
                    context: "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
                    location: ""
                },
                {
                    time: "2018-05-08 21:36:04",
                    ftime: "2018-05-08 21:36:04",
                    context: "商品已经下单",
                    location: ""
                }
            ]
        }
    },
    created () {
        this.getOrdersList();
    },
    methods: {                                           
        getOrdersList(){
            getOrders(this.queryInfo).then(res=>{
                // console.log(res);
                this.orderslist = res.data.data.goods;
                this.total = res.data.data.total;
            })
        },
        // 每页显示多少条数据
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize;
            this.getOrdersList();
        },
        // 页码
        handleCurrentChange(newPage){
            this.queryInfo.pagenum = newPage;
            this.getOrdersList();
        },
        // 展示修改地址对话框
        showBox(){
            this.addressVisible = true;
        },
        showProgressBox(){
            this.progressVisible = true;
            // 接口不能用
            // getKuaidi(1106975712662).then(res=>{
            //     console.log(res);
            // })
            // activity是数据
        }
        
    },
    filters:{
        createDate(value){
            // 1.将时间戳转成Date对象
            const date = new Date(value * 1000);
            // 2.将date进行格式化
            return formatDate(date,'yyyy-MM-dd hh:mm:ss')
        }
    }
    
}
</script>

<style lang="less" scoped>
.el-table{
    margin: 15px 0;
}

</style>