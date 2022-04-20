<template>
    <div class="categories">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row>
                <el-col :span="24"> <el-button type="primary" @click="showAddCateDialog">添加分类</el-button></el-col>
            </el-row>
            <!-- 表格 -->
            <!-- 这里需要用到cnpm i vue-table-with-tree-grid -S  插件 -->
            <zk-table class="zkTable" :data="categoriesList" border show-index index-text="#"
            :columns="columns" :expand-type="false" :selection-type="false" :show-row-hover="false">
                <!-- 是否有效 -->
                <template slot="isok" slot-scope="scope">
                    <i v-if="scope.row.cat_deleted === false" class="el-icon-success" style="color:green;"></i>
                    <i v-else class="el-icon-error" style="color:red;"></i>
                </template>
                <!-- 排序 -->
                <template slot="order" slot-scope="scope">
                    <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
                    <el-tag v-else-if="scope.row.cat_level === 1" size="mini" type="success">二级</el-tag>
                    <el-tag v-else size="mini" type="warning">三级</el-tag>
                </template>
                <!-- 操作 -->
                <template slot="opt" slot-scope="scope">
                    <el-button size="mini" icon="el-icon-edit" type="primary" @click="categoriesEdit(scope.row.cat_id)">编辑</el-button>
                    <el-button size="mini" icon="el-icon-delete" type="danger" @click="delCategory(scope.row.cat_id)">删除</el-button>
                </template>
            </zk-table>
            <!-- 页码 -->
            <el-pagination
            @size-change="catHandleSizeChange"
            @current-change="catHandleCurrentChange"
            :current-page.sync="querInfo.pagenum"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="querInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加分类对话框 -->
        <el-dialog
        title="添加分类"
        :visible.sync="addCateDialogVisible"
        width="50%" 
        @close="addCateDialogClose">
            <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
                <el-form-item label="分类名称:" prop="cat_name">
                    <el-input v-model="addCateForm.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类:">
                    <!-- Cascader 级联选择器 -->
                    <!-- 
                        expand-trigger='hover'通过鼠标覆盖来展开子菜单
                        :options="options"  指定数据源，键名可通过 Props 属性配置
                        
                        :props  用来指定配置对象  用来配置节点选择框
                            value	指定选项的值为选项对象的某个属性值
                            children	指定选项的子选项为选项对象的某个属性值
                            label	指定选项标签为选项对象的某个属性值
                        :props="{ checkStrictly: true }" 单选选择任意一级选项

                        v-model   选中项双向绑定到data中,必须是数组
                        change-on-select
                     -->
                    <el-cascader
                        expand-trigger='hover'
                        v-model="selectedKeys"
                        :options="parentCateList"
                        :props="cascaderProps"
                        @change="parentCateChange"
                        clearable
                        >
                    </el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCate">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑对话框 -->
        <el-dialog
            title="编辑分类"
            :visible.sync="categoriesEditVisible"
            width="50%">
            <el-form ref="categoriesEditRef" :model="categoriesEditForm" label-width="80px">
                <el-form-item label="分类名称:">
                    <el-input v-model="categoriesEditForm.cat_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="categoriesEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDetermine">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getCategories,postClassify,getQueryClassify,putCategories,deleteCategories } from "network/categories";
export default {
    data () {
        return {
            // 查询条件
            querInfo:{
                type:3,
                pagenum:1,
                pagesize:5
            },
            categoriesList:[],//商品分类的数据列表,默认为空
            total:0, //总数据条数
            // 为table指定列的定义
            columns:[
                {
                    label: '分类名称',
                    prop: 'cat_name'
                },{
                    //这里用到的是 cnpm i vue-table-with-tree-grid -S  插件
                    label: '是否有效',
                    type: 'template',// 这里表示,将当前列定义为模板列
                    template: 'isok'    // 这里表示,当前这一列使用模板名称
                },{
                    label: '排序',
                    type: 'template',
                    template: 'order'
                },{
                    label: '操作',
                    type: 'template',
                    template: 'opt'
                }
            ],
            // 控制添加分类对话框的显示隐藏
            addCateDialogVisible:false,
            // 添加分类的表单数据对象
            addCateForm:{
                cat_pid:0,//父级分类的id
                cat_name:'',//将要添加分类表单的名称
                cat_level:0 // 分类的等级,默认要添加的是一级分类
            },
            // 添加分类表单的验证规则的对象
            addCateFormRules:{
                cat_name:[
                    { required: true, message: '请输入分类名称', trigger: 'blur' }
                ]
            },
            // 父级分类的列表
            parentCateList:[],
            // 指定级联选择器的配置对象
            cascaderProps:{
                value:'cat_id',
                label:'cat_name',
                children:'children',
                checkStrictly: true //单选选择任意一级选项
            },
            // 选中父级分类的id数组
            selectedKeys:[],
            // 根据 id 查询分类 编辑
            categoriesEditForm:{},
            // 编辑分类对话框的显示隐藏
            categoriesEditVisible:false
        }
    },
    created () {
        this.getCategoriesList();
    },
    methods: {
        getCategoriesList(){
            // getCategories(this.querInfo).then(res=>{
            getCategories(this.querInfo.type,this.querInfo.pagenum,this.querInfo.pagesize).then(res=>{
                // console.log(res.data)
                this.categoriesList = res.data.data.result;
                // this.categoriesList = res.data.data;
                this.total = res.data.data.total;
                // console.log(this.categoriesList);
                // console.log(this.total)
            })
        },
        // 监听pageSize 改变时会触发
        catHandleSizeChange(newSize){
            this.querInfo.pagesize = newSize;
            this.getCategoriesList();// pageSize改变立即刷新
        },
        // 监听pagenum改变
        catHandleCurrentChange(newPage){
            this.querInfo.pagenum = newPage;
            this.getCategoriesList();
        },
        // 点击添加分类显示
        showAddCateDialog(){
            // 获取前两级分类  先获取父级分类的数据列表
            getCategories(2).then(res=>{
                console.log(res.data.data);
                // 父级分类的列表
                this.parentCateList = res.data.data;
            })
            this.addCateDialogVisible = true;
        },
        // 选择项发生变化触发这个函数
        parentCateChange(){
            //如果 selectedKeys 数组中的length 大于0 证明选中的父级分类
            //繁殖 就说明没有选中任务父级分类
            console.log(this.selectedKeys)
            if(this.selectedKeys.length > 0){
                // 父级分类的id
                console.log(this.selectedKeys)
                this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length -1];
                // 分类的等级 赋值
                this.addCateForm.cat_level = this.selectedKeys.length;
            }else{
                this.addCateForm.cat_pid = 0;
                this.addCateForm.cat_level = 0;
            }
        },
        // 点击按钮 添加新的分类
        addCate(){
            console.log(this.addCateForm)
            this.$refs.addCateFormRef.validate(valid=>{
                if(!valid) return;
                postClassify(this.addCateForm.cat_pid,this.addCateForm.cat_name,this.addCateForm.cat_level).then(res=>{
                    console.log(res);
                    if(res.data.meta.status !== 201){
                        return this.$message.error("添加新的分类失败");
                    }
                    this.$message.success('添加新的分类成功');
                    this.addCateDialogVisible = false;
                    this.getCategoriesList();
                })
            })
            
        },
        // 监听对话框的关闭事件,重置表单数据
        addCateDialogClose(){
            this.$refs.addCateFormRef.resetFields();
            this.selectedKeys = [];
            this.addCateForm.cat_pid = 0;
            this.addCateForm.cat_level = 0;
        },
        // 点击编辑按钮
        categoriesEdit(id){
            getQueryClassify(id).then(res=>{
                console.log(res.data.data);
                this.categoriesEditForm = res.data.data;
                this.categoriesEditVisible = true;
                console.log(this.categoriesEditForm)
            })
        },
        // 编辑后提交
        editDetermine(){
            this.$refs.categoriesEditRef.validate(valid=>{
                if(valid){
                    // console.log(this.categoriesEditForm.cat_id)
                    putCategories(this.categoriesEditForm.cat_id,this.categoriesEditForm.cat_name).then(res=>{
                        if(res.data.meta.status !== 200){
                            return this.$message.error("编辑分类名称失败");
                        }
                        this.$message.success("编辑更新名称成功");
                        this.categoriesEditVisible = false;
                        this.getCategoriesList();
                    })
                }
            })
        },
        // 删除分类
        delCategory(id){
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                return deleteCategories(id)
            }).then((res)=>{
                if(res.data.meta.status == 200){
                    this.getCategoriesList();
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>

<style lang="less" scoped>
.zkTable,.el-pagination{
    margin-top: 15px;
}
.el-cascader{
    width: 100%;
}

</style>