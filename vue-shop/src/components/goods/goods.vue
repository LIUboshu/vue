<template>
    <div class="goods">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片试图去 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
                        <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="goAddpage">添加商品</el-button>
                </el-col>
            </el-row>
            <!-- table表格区 -->
            <el-table
                :data="goodsList"
                stripe
                border
                style="width: 100%">
                <el-table-column type="index">
                </el-table-column>
                <el-table-column
                prop="goods_name"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="goods_price"
                label="商品价格" width="95px">
                </el-table-column>
                <el-table-column
                prop="goods_weight"
                label="商品重量" width="90px">
                </el-table-column>
                <el-table-column prop="add_time" label="创建时间" width="200px">
                    <template slot-scope="scope">
                        {{scope.row.add_time | createDate}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.goods_id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[5, 10, 15,20]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import { getGoods,delGoods } from "network/goods.js";
import { formatDate } from "network/utils.js";
export default {
    data () {
        return {
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:10
            },
            // 商品列表
            goodsList:[],
            // 商品页数
            total:0
        }
    },
    created () {
        this.getGoodsList();
    },
    methods: {
        // 根据分页获取对应的商品列表
        getGoodsList(){
            getGoods(this.queryInfo.query,this.queryInfo.pagenum,this.queryInfo.pagesize).then(res=>{
                // console.log(res);
                this.goodsList = res.data.data.goods;
                this.total = res.data.data.total;
            })
        },
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize;
            this.getGoodsList();
        },
        handleCurrentChange(newPage){
            this.queryInfo.pagenum = newPage;
            this.getGoodsList();
        },
        // 删除商品
        removeById(id){
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                return delGoods(id)
            }).then(res=>{
                if(res.data.meta.status == 200){
                    this.getGoodsList();
                    console.log("删除成功")
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 跳转添加商品页面
        goAddpage(){
            this.$router.push("/goods/add");
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