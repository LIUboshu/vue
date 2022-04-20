<template>
  <div class="roles">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row>
                <el-col><el-button type="primary" @click="addRolesVisible = true">添加角色</el-button></el-col>
            </el-row>
            <el-table :data="rolesList" border stripe>
                <!-- 展开列 -->
                <el-table-column type="expand">
                    <template v-slot="scope">
                        <el-row :class="['bdbottom', index == 0 ?  'bdtop' : '']" v-for="(item,index) in scope.row.children" :key="index">
                            <!-- 渲染一级权限 -->
                            <el-col :span="5">
                                <el-tag closable @close="removeRightById(scope.row,item.id)">{{item.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 渲染二级,三级权限 -->
                            <el-col :span="19">
                                <!-- 二级权限 -->
                                <el-row :class="[index2 === 0 ? '' : 'bdtop']" v-for="(item2,index2) in item.children" :key="index2">
                                    <!-- 左边 二级权限 -->
                                    <el-col :span="6">
                                         <el-tag closable @close="removeRightById(scope.row,item2.id)" type="success">{{item2.authName}}</el-tag>
                                         <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <!-- 右边 三级权限 -->
                                    <el-col :span="18">
                                        <el-tag closable type="warning" v-for="(item3,index3) in item2.children" :key="index3" @close="removeRightById(scope.row,item3.id)">{{item3.authName}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        
                    </template>
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template v-slot="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editRoles(scope.row.id)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="delRoles(scope.row.id)">删除</el-button>
                        <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 添加角色 -->
        <el-dialog
        title="添加角色"
        :visible.sync="addRolesVisible"
        width="50%" @close='addRolesClose'>
            <el-form :model="addRolesModel" ref="addRolesForm" label-width="100px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addRolesModel.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addRolesModel.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addRolesVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRoles">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑角色 -->
        <el-dialog
        title="编辑角色"
        :visible.sync="editRolesVisible"
        width="50%" @close='editRolesClose'>
            <el-form ref="editRolesRef" :model="editRolesForm" label-width="80px">
                <el-form-item label="角色名称">
                    <el-input v-model="editRolesForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="editRolesForm.roleDesc"></el-input>
                </el-form-item>
            </el-form> 
            <span slot="footer" class="dialog-footer">
                <el-button @click="editRolesVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRolesInfo">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 分配权限对话框 -->
        <el-dialog
        title="分配权限"
        :visible.sync="setRightDialogVisible"
        width="50%" @close="setRightDialogClosed">
        <!-- node-key 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 -->
            <el-tree :data="rightlist" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotRights">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import { getRolesListData,postRoles,getRolesId,putEditRoles,deleteRoles,delRolesJurisdiction,getRightsTree,postRolesAuthorize } from "network/roles.js";
export default {
    data () {
        return {
            // 所有角色列表数据
            rolesList:[],
            addRolesVisible:false,
            addRolesModel:{
                roleName:'',
                roleDesc:''
            },
            editRolesForm:{},
            editRolesVisible:false,
            setRightDialogVisible:false,
            // 所有权限的数据
            rightlist:[],
            // 树形控件的属性绑定对象
            treeProps:{
                children: 'children',
                label: 'authName'
            },
            // 默认选中的节点id值数组
            defKeys:[],
            //当前即将分配权限的角色id
            roleId:''
        }
    },
    created () {
        this.getRolesList();
    },
    methods: {
        // 获取所有角色的列表
        getRolesList(){
            getRolesListData().then(res=>{
                this.rolesList = res.data.data;
            })
        },
        addRolesClose(){
            this.$refs.addRolesForm.resetFields();
        },
        addRoles(){
            this.$refs.addRolesForm.validate((valid)=>{
                if(valid){
                    postRoles(this.addRolesModel.roleName,this.addRolesModel.roleDesc).then(res=>{
                        if(res.data.meta.status !== 201){
                            this.$message.error('添加用户失败')
                        }
                        this.$message.success('添加用户成功')
                        // 隐藏添加用户的对话框
                        this.addRolesVisible = false;
                        this.getRolesList();
                    })
                }else{
                    return
                }
            })
        },
        // 获取编辑用户
        editRoles(id){
            this.editRolesVisible = true;
            getRolesId(id).then(res=>{
                this.editRolesForm = res.data.data;
            })
        },
        editRolesClose(){
            this.$refs.editRolesRef.resetFields();
        },
        // 修改编辑用户成功
        editRolesInfo(){
            this.$refs.editRolesRef.validate(valid=>{
                if(valid){
                    putEditRoles(this.editRolesForm.roleId,this.editRolesForm.roleName,this.editRolesForm.roleDesc).then(res=>{
                        if(res.data.meta.status !== 200){
                            this.$message.error('修改用户失败')
                        }
                        this.$message.success('修改用户成功')
                        // 隐藏添加用户的对话框
                        this.editRolesVisible = false;
                        this.getRolesList();
                    })
                }
            })
        },
        //删除用户
        delRoles(id){
            this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                return deleteRoles(id);// 响应删除功能
            }).then((res)=>{
                // console.log(res)
                if(res.data.meta.status == 200){
                    this.getRolesList();// 删除成功之后  刷新数据
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //根据id删除对应的权限
        async removeRightById(roleId,rightId){
            const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err=>err);
            if(confirmResult !== 'confirm'){
                return this.$message.info("取消了删除")
            }
            console.log(roleId);// 角色id
            console.log(rightId)// 权限id
            delRolesJurisdiction(roleId.id,rightId).then(res=>{
                if(res.data.meta.status !== 200){
                    this.$message.error("删除失败")
                }
                this.$message.success("删除成功")
                // 返回的data, 是当前角色下最新的权限数据
                // 直接复制过去,避免页面刷新
                roleId.children = res.data.data
            })
        },
        // 分配权限
        async showSetRightDialog(role){
            this.roleId = role.id;
            const {data:res} = await getRightsTree();
            // console.log(res);
            this.rightlist = res.data;
            //递归获取三级节点的id
            this.getLeafKeys(role,this.defKeys);
            this.setRightDialogVisible = true;
        },
        // 通过递归的形式 获取角色下所有三级权限的id,并保存到defKeys数组中
        getLeafKeys(node,arr){
            // 如果当前node节点不包含children属性,则是三级节点
            if(!node.children){
                return arr.push(node.id)
            }
            node.children.forEach(item=>this.getLeafKeys(item,arr))
        },
        // 监听分配权限对话框的关闭事件
        setRightDialogClosed(){
            this.defKeys = [];
        },

        // 点击确定为橘色分配权限
        allotRights(){
            const keys = [
                ...this.$refs.treeRef.getCheckedKeys(),//全选
                ...this.$refs.treeRef.getHalfCheckedKeys()//半选
            ];
            const idStr = keys.join(',');
            postRolesAuthorize(this.roleId,idStr).then(res=>{
                if(res.data.meta.status !== 200){
                    return this.$message.error("分配权限失败")
                }
                this.$message.success("分配权限成功");
                this.getRolesList();
                this.setRightDialogVisible = false;
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .el-table{
        margin-top: 5px;
    }
    .el-tag{
        margin: 5px;
    }
    .bdtop{
        border-top: 1px solid #eee;
    }
    .bdbottom{
        border-bottom: 1px solid #eee;
    }
</style>