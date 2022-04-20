<template>
    <div class="params">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>参数列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card class="box-card">
            <!-- Alert 警告 -->
            <el-alert
                title="注意:只允许为第三级分类设置相关参数!"
                type="warning"
                show-icon
                :closable="false">
            </el-alert>
            <el-row class="cat_opt">
                <el-col>
                    <!-- Cascader 级联选择器 -->
                    <span class="demonstration">选择商品分类 : </span>
                    <!-- v-model可以把那些选中的id 值 双向绑定到对应的数组中 -->
                    <el-cascader
                        expand-trigger='hover'
                        v-model="selectedCateKeys"    
                        :options="paramsList"
                        :props="cateProps"
                        @change="handleChange">
                    </el-cascader>
                </el-col>
            </el-row>
            <!-- Tabs 标签页 -->
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="动态参数" name="many">
                    <el-button type="primary" size="mini" :disabled="isBtnDisbled" @click="addDialogVisible = true">添加参数</el-button>
                    <el-table border stripe
                        :data="manyTableData"
                        style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <!-- 循环渲染tag标签 -->
                                <el-tag
                                    v-for="(item,index) in scope.row.attr_vals"
                                    :key="index"
                                    closable @close="handleClose(index,scope.row)">
                                    {{item}}
                                </el-tag>
                                <!-- 输入文本框 -->
                                <el-input
                                    class="input-new-tag"
                                    v-if="scope.row.inputVisible"
                                    v-model="scope.row.inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleInputConfirm(scope.row)"
                                    @blur="handleInputConfirm(scope.row)"
                                    >
                                </el-input>
                                <!-- 添加按钮 -->
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column type="index"></el-table-column>
                        <el-table-column prop="attr_name" label="参数名称"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit"
                                size="mini" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                                <el-button size="mini" icon="el-icon-delete"
                                type="danger" @click="removeParams(scope.row.attr_id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="only">
                    <el-button type="primary" size="mini" :disabled="isBtnDisbled" @click="addDialogVisible = true">添加属性</el-button>
                    <el-table border stripe
                        :data="onlyTableData"
                        style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <!-- 循环渲染tag标签 -->
                                <el-tag
                                    v-for="(item,index) in scope.row.attr_vals"
                                    :key="index"
                                    closable @close="handleClose(index,scope.row)">
                                    {{item}}
                                </el-tag>
                                <!-- 输入文本框 -->
                                <el-input
                                    class="input-new-tag"
                                    v-if="scope.row.inputVisible"
                                    v-model="scope.row.inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleInputConfirm(scope.row)"
                                    @blur="handleInputConfirm(scope.row)"
                                    >
                                </el-input>
                                <!-- 添加按钮 -->
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column type="index"></el-table-column>
                        <el-table-column prop="attr_name" label="参数名称"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit"
                                size="mini" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                                <el-button size="mini" icon="el-icon-delete"
                                type="danger" @click="removeParams(scope.row.attr_id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <!-- 添加参数对话框 -->
        <el-dialog
        :title="'添加'+titleText"
        :visible.sync="addDialogVisible"
        width="50%" @close="addDialogClose">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                <el-form-item :label="titleText" prop="attr_name">
                    <el-input v-model="addForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addParams">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改对话框 -->
        <el-dialog
        :title="'修改'+titleText"
        :visible.sync="editDialogVisible"
        width="50%" @close="editDialogClose">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
                <el-form-item :label="titleText" prop="attr_name">
                    <el-input v-model="editForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editParams">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getCategories } from "network/categories.js";
import { getCategoriesAttributes,postCategoriesAttributes,getCategoriesIdAttributes,putCategoriesIdAttributes,deleteCategoriesIdAttributes } from "network/params.js";
export default {
    data () {
        return {
            paramsList:[],   //商品分类数据列表
            // 级联选择框的配置对象
            cateProps:{
                value:'cat_id',  //指定选中的那个值
                label:'cat_name',   //指定所看到的值
                children:'children'   //指定父子节点的嵌套属性
            },
            // 级联选择框双向绑定到的数组
            selectedCateKeys:[],
            // Tabs 标签页被激活的页面的名称
            activeName:'many',
            // 动态参数数据
            manyTableData:[],
            // 静态参数数据
            onlyTableData:[],
            // 添加参数对话框的显示与隐藏
            addDialogVisible:false,
            //添加参数的表单数据对象
            addForm:{
                attr_name:''
            },
            addFormRules:{
                attr_name:[
                    { required: true, message: '请输入参数名称', trigger: 'blur' },
                ]
            },
            // 控制修改对话框的显示与隐藏
            editDialogVisible:false,
            // 修改的表单数据对象
            editForm:{

            },
            // 修改表单的验证规则对象
            editFormRules:{
                attr_name:[
                    { required: true, message: '请输入参数名称', trigger: 'blur' },
                ]
            },
            /* 
            // 因为公用出现联动的bug
            // 控制按钮与文本框的切换显示
            inputVisible:false,
            // 文本框输入的内容
            inputValue:''
             */
        }
    },
    created () {
        this.getParamsList();
    },
    methods: {
        getParamsList(){
            getCategories(3).then(res=>{
                this.paramsList = res.data.data;
                // console.log(this.paramsList);
            })
        },
        // 级联选择框选中项变化,会触发这个函数
        handleChange(){
            this.getParamsData();
        },
        // tab页签 点击事件处理函数
        handleTabClick(){
            this.getParamsData();
            // console.log(this.activeName)
        },
        getParamsData(){
            // 选中的不是3级分类
            if(this.selectedCateKeys.length !== 3){
                this.selectedCateKeys = [];
                this.manyTableData = [];
                this.onlyTableData = [];
                return
            }
            // 选中的三级分类
            // console.log(this.selectedCateKeys)
            getCategoriesAttributes(this.cateId,this.activeName).then(res=>{
                // console.log(res.data.data)
                res.data.data.forEach(item=>{
                    item.attr_vals= item.attr_vals ? item.attr_vals.split(' ') : [];
                    // 控制文本框的显示与隐藏  为item添加了inputVisible属性
                    item.inputVisible = false;
                    // 文本框中的输入值 为item添加了inputValue属性
                    item.inputValue = ''
                })
                if(this.activeName === "many"){
                    //动态参数数据
                    this.manyTableData = res.data.data;
                }else{
                    //静态参数数据
                    this.onlyTableData = res.data.data;
                }
            })
        },
        // 监听添加对话框的关闭事件
        addDialogClose(){
            this.$refs.addFormRef.resetFields();
        },
        addParams(){
            this.$refs.addFormRef.validate(valid=>{
                console.log(valid)
                if(!valid) return;
                postCategoriesAttributes(this.cateId,this.addForm.attr_name,this.activeName).then(res=>{
                    console.log(res.data.meta.status !== 201);
                    if(res.data.meta.status !== 201){
                        return this.$message.error("添加参数失败")
                    }
                    this.$message.success("添加参数成功");
                    this.addDialogVisible = false;
                    this.getParamsData();// 刷新动态数据和静态数据
                })
            })
        },
        // 点击按钮,展示修改的对话框
        showEditDialog(id){
            // 查询当前参数的信息
            getCategoriesIdAttributes(this.cateId,id,this.activeName).then(res=>{
                if(res.data.meta.status !== 200){
                    return this.$message.error("获取参数信息失败")
                }
                this.editForm = res.data.data;
                // console.log(this.editForm );
            })
            this.editDialogVisible = true;
        },
        // 关闭后清空对话框  重置修改的表单
        editDialogClose(){
            this.$refs.editFormRef.resetFields();
        },
        // 点击修改确定按钮 修改参数信息
        editParams(){
            this.$refs['editFormRef'].validate((valid) => {
                if(!valid){
                    return 
                }
                putCategoriesIdAttributes(this.cateId,this.editForm.attr_id,this.editForm.attr_name,this.activeName).then(res=>{
                    console.log(res);
                    if(res.data.meta.status !== 200){
                        return this.$message.error("修改参数失败")
                    }
                    this.$message.success("修改参数成功");
                    this.editDialogVisible = false;
                    this.getParamsData();
                })
            })
        },
        // 点击删除按钮 
        async removeParams(attr_id){
            const confirmResult =  await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err => err);
            if(confirmResult !== 'confirm'){
                return this.$message.info('已取消删除')
            }
            const {data:res} = await this.$http.delete(`categories/${this.cateId}/attributes/${attr_id}`)
            if(res.meta.status !== 200){
                this.$message.error("删除失败")
            }
            this.$message.success("删除参数成功")
            this.getParamsData();
        },
        /* 
        // 不能删除   (有问题)
        removeParams(attr_id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                return deleteCategoriesIdAttributes(this.cateId,attr_id)
            }).then((res)=>{
                // console.log(res);
                if(res.data.meta.status == 200){
                    this.getParamsData();
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
        */

        // 文本框市区焦点,或者摁下了 enter键都会触发
        handleInputConfirm(row){
            // trim()是去掉字符串左右两端的空格
            if(row.inputValue.trim().length === 0 ){
                row.inputValue = '';
                row.inputVisible = false;
                return
            }
            // 如果没有return 则证明输入的内容,需要做后续的处理
            row.attr_vals.push(row.inputValue.trim());
            row.inputValue = '';
            row.inputVisible = false;
            // 需要发起请求,保存这次操作
            this.saveAttrVal(row);
            /* const attrVals = row.attr_vals.join(" ");
            putCategoriesIdAttributes(this.cateId,row.attr_id,row.attr_name,row.attr_sel,attrVals).then(res=>{
                console.log(res);
                if(res.data.meta.status !== 200){
                    return this.$message.error("修改参数项失败")
                }
                this.$message.success("修改参数项成功")
                
            }) */
        },
        // 将attr_vals的操作,保存到数据库
        saveAttrVal(row){
            // 需要发起请求,保存这次操作
            const attrVals = row.attr_vals.join(" ");
            putCategoriesIdAttributes(this.cateId,row.attr_id,row.attr_name,row.attr_sel,attrVals).then(res=>{
                console.log(res);
                if(res.data.meta.status !== 200){
                    return this.$message.error("修改参数项失败")
                }
                this.$message.success("修改参数项成功")
            })
        },
        // 点击按钮,展示文本输入框
        showInput(row){
            row.inputVisible = true;
            // $nextTick方法作用,就是当页面上元素被重新渲染之后,才会指定回调函数中的代码
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        // tag想删除
        handleClose(index,row){
            row.attr_vals.splice(index,1);
            this.saveAttrVal(row);
        }
    },
    computed: {
        // 如果按钮需要被禁止,则返回true,否则返回false
        isBtnDisbled(){
            if(this.selectedCateKeys.length !== 3){
                return true
            }else{
                return false
            }
        },
        // 当前选中三级分类的id
        cateId(){
            if(this.selectedCateKeys.length === 3){
                return this.selectedCateKeys[2]
            }else{
                return null;
            }
        },
        // 动态计算标题的文本
        titleText(){
            if(this.activeName === "many"){
                return "动态参数"
            }else{
                return "静态参数"
            }
        }
    }
}
</script>

<style lang="less" scoped>
.cat_opt{
    margin: 15px 0;
}
.el-tag{
    margin: 10px;
}
.input-new-tag{
    width: 120px;
}

</style>