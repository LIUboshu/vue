<template>
  <div class="users">
    <!-- 面包屑导航区 -->
	<el-breadcrumb separator-class="el-icon-arrow-right">
	  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
	  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
	  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
	</el-breadcrumb>
	<!-- 卡片区域 -->
	<el-card>
		<!-- 搜索与添加区域 -->
		<el-row :gutter="20">
		  <el-col :span="8">
			  <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
			  	<el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
			  </el-input>
		  </el-col>
		  <el-col :span="3">
			   <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
		  </el-col>
		</el-row>
		<!-- 用户列表区域 -->
		<el-table :data="usersList" stripe border>
		  <el-table-column type="index" label="序号"></el-table-column>
		  <el-table-column prop="username" label="姓名"></el-table-column>
		  <el-table-column prop="email" label="邮箱"></el-table-column>
		  <el-table-column prop="mobile" label="电话"></el-table-column>
		  <el-table-column prop="role_name" label="角色"></el-table-column>
		  <el-table-column prop="mg_state" label="状态">
			  <!-- <template slot-scope="slot">
				  <el-switch
					v-model="slot.row.mg_state">
				</el-switch>
			  </template> -->
			  <!-- slot-scope被 v-slot 代替 -->
			  <!-- 作用域插槽 -->
			  <template v-slot="s">
				  <!-- row  代表的是每一行 -->
				  <el-switch v-model="s.row.mg_state" @change='userStateChanges(s.row)'></el-switch>
				  <!-- 当前行数据的获取也会用到插槽,scope相当于一行的数据， scope.row相当于当前行的数据对象 -->
			  </template>
		  </el-table-column>
		  <el-table-column label="操作">
			  <template v-slot="scope">
				<!-- 修改按钮 -->
				<el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
				<!-- 删除按钮 -->
				<el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
				<!-- 分配角色按钮 -->
				<el-tooltip content="分配角色" placement="top" :enterable="false">
					<el-button type="warning" icon="el-icon-s-tools" size="mini" @click="setRole(scope.row)"></el-button>
				</el-tooltip>
			  </template>
		  </el-table-column>
		</el-table>
		<!-- 分页区域 -->
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="queryInfo.pagenum"
			:page-sizes="[1, 2, 5, 10]"
			:page-size="queryInfo.pagesize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total">
		</el-pagination>
	</el-card>

	<!-- 添加用户的对话框 -->
	<el-dialog
		title="提示"
		:visible.sync="addDialogVisible"
		width="50%" @close='addDialogClose'>
		<!-- 内容主体区 -->
		<el-form :model="addFrom" :rules="addFromRules" ref="addFromRef" label-width="100px">
			<el-form-item label="用户名称" prop="username">
				<el-input v-model="addFrom.username"></el-input>
			</el-form-item>
			<el-form-item label="用户密码" prop="password">
				<el-input v-model="addFrom.password"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="addFrom.email"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="mobile">
				<el-input v-model="addFrom.mobile"></el-input>
			</el-form-item>
		</el-form>
		<!-- 底部区域 -->
		<span slot="footer" class="dialog-footer">
			<el-button @click="addDialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="addUser">确 定</el-button>
		</span>
	</el-dialog>
	<!-- 修改用户对话框 -->
	<el-dialog
		title="修改用户信息"
		:visible.sync="editDialogVisible"
		width="50%"
		@close="editDialogClosed">
		<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
			<el-form-item label="用户名">
				<el-input v-model="editForm.username" disabled></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="editForm.email"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="mobile">
				<el-input v-model="editForm.mobile"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="editDialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="editUserInfo">确 定</el-button>
		</span>
	</el-dialog>
	<!-- 分配角色的对话框 -->
	<el-dialog
	title="分配角色"
	:visible.sync="setRoleDialogVisible"
	width="50%" @close="setRoleDialogClosed">
		<div>
			<p>当前的用户:{{userInof.username}}</p>
			<p>当前的角色:{{userInof.role_name}}</p>
			<p>分配新角色:
				<el-select v-model="selectedRoleId" placeholder="请选择">
					<el-option
					v-for="item in rolesList"
					:key="item.id"
					:label="item.roleName"
					:value="item.id">
					</el-option>
				</el-select>
			</p>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="setRoleDialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="saveRoleInfo">确 定</el-button>
		</span>
	</el-dialog>
  </div>
</template>
<script>
import {getUserList,putUserState,postUser,showEditDialogData,editUserInfoData,removeUserByIdData,putUserRole} from 'network/users.js'
import {getRolesListData} from 'network/roles.js'
export default {
  name:'Users',
  data() {
	// 验证邮箱的规则
	let checkEmail = (rule,value,callback) =>{
		let regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if(regEmail.test(value)){
			return callback();//合法邮箱
		}
		callback(new Error('请输入合法的邮箱'));
	}
	// 验证手机号的规则
	let checkMobile = (rule,value,callback) =>{
		const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/; 
		if(regMobile.test(value)){
			return callback();
		}
		callback(new Error('请输入合法的手机号'));
	}
  	return {
		queryInfo:{
			query:'',	// 搜索关键字
			pagenum:1,	// 当前的页数
			pagesize:2	//当前每页显示多少条数据
		},
		usersList:[],
		total:0,	// 总数据条数
		// 控制添加用户对话框的显示与隐藏
		addDialogVisible:false,
		addFrom:{
			username:'',
			password:'',
			email:'',
			mobile:''
		},
		addFromRules:{
			username:[
				{ required: true, message: '请输入账号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
			],
			password:[
				{ required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
			],
			email:[
				{ required: true, message: '请输入邮箱', trigger: 'blur' },
				{ validator: checkEmail, trigger: 'blur' }
			],
			mobile:[
				{ required: true, message: '请输入手机号', trigger: 'blur' },
				{ validator: checkMobile, trigger: 'blur' }
			]
		},
		editDialogVisible:false,	//点击修改显示隐藏
		editForm:{},//查询到的用户信息对象
		// 修改表单的验证规则对象
		editFormRules:{
			email:[
				{ required: true, message: '请输入邮箱', trigger: 'blur' },
				{ validator: checkEmail, trigger: 'blur' }
			],
			mobile:[
				{ required: true, message: '请输入手机号', trigger: 'blur' },
				{ validator: checkMobile, trigger: 'blur' }
			]
		},
		// 控制分配角色对话框的显示与隐藏
		setRoleDialogVisible:false,
		userInof:{},//需要被分配角色的用户信息
		rolesList:[],	//所有角色的数据列表
		selectedRoleId:''	//已选中的角色id
  	}
  },
  created() {
	  this.getUserList();
  },
  methods:{
	  getUserList(){
		  // getUserList(当前页数,当前每页显示多少条数据)
		 
		  getUserList(this.queryInfo.pagenum,this.queryInfo.pagesize,this.queryInfo.query).then(res=>{
		// getUserList(1,2).then(res=>{
			//  console.log(res)
			  const usersLists = res.data.data;
			  this.usersList = usersLists.users;
			  this.total = usersLists.total;
			  // console.log(usersLists);
		  })
	  },
	  // 监听pagesize改变的事件     当前每页显示多少条数据
	  handleSizeChange(newSize){
		  this.queryInfo.pagesize = newSize;
		  this.getUserList();
	  },
	  // 监听页码值  改变的事件    当前的页数
	  handleCurrentChange(newPage){
		  this.queryInfo.pagenum = newPage;
		  this.getUserList();// 需要重新获取数据
	  },
	  //监听用户状态
	  userStateChanges(userinfo){
		  putUserState(userinfo.id,userinfo.mg_state).then(res=>{
			//   console.log(res);
			  if(res.data.meta.status !== 200){
				  userinfo.my_state = !userinfo.my_state;// 数据库没有修改,但是页面已经改变,所以这里要取反
				  return this.$message.error('修改失败');
			  }
			  this.$message.success('修改状态成功');
		  })
		// const {data:res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`);
		// console.log(res);
	  },
	  // 监听添加用户对话框的关闭时间
	  addDialogClose(){
		  this.$refs.addFromRef.resetFields();
	  },
	  // 点击按钮添加新用户
	  addUser(){
		  //表单的预校验
			this.$refs.addFromRef.validate(vaild =>{
				// console.log(vaild)
				// vaild为true 可以发起添加用户的网络请求
				if(vaild){
					postUser(this.addFrom.username,this.addFrom.password,this.addFrom.email,this.addFrom.mobile).then(res => {
						console.log(res);
						if(res.data.meta.status !== 201){
							this.$message.error('添加用户失败')
						}
						this.$message.success('添加用户成功')
						// 隐藏添加用户的对话框
						this.addDialogVisible = false;
						// 重新获取用户列表
						this.getUserList();
					})
				}else{
					return
				}
			})
	  },
	  // 点击修改用户的对话框
	  showEditDialog(id){
		  showEditDialogData(id).then(res=>{
			  this.editForm = res.data.data;
		  })
		  this.editDialogVisible = true;
	  },
	  //监听修改用户对话框的关闭事件
	  editDialogClosed(){
		this.$refs.editFormRef.resetFields();
	  },
	  editUserInfo(){
		  this.$refs.editFormRef.validate(valid =>{
			  if(!valid) return 
			  //发起修改用户信息的数据请求
			  editUserInfoData(this.editForm.id,this.editForm.email,this.editForm.mobile).then(res=>{
				  console.log(res);
				  if(res.data.meta.status !== 200){
					  return this.$message.error('修改失败')
				  }
				  //提示修改成功
				  this.$message.success('修改成功');
				  // 关闭对话框
				  this.editDialogVisible = false;
				  // 刷新数据列表
				  this.getUserList();
			  })
		  })
	  },
	  // 根据id删除对应用户信息
	  removeUserById(id) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
			this.$message({
				type: 'success',
				message: '删除成功!'
			});
			return removeUserByIdData(id);
		}).then((res)=>{
			if(res.data.meta.status == 200){
				this.getUserList();
			}
		}).catch(()=>{
			this.$message({
				type: 'info',
				message: '已取消删除'
			});
		});
		// console.log(confirmResult);
		// 如果用户确认删除,则返回值为字符串 confirm
		// 如果用户取消了删除,则返回值为字符串 cancel

		// if(confirmResult !== "confirm"){
		// 	this.$message.info('已取消删除')
		// }
		// // 删除单个用户 接口
		// removeUserByIdData(id).then(res=>{
		// 	console.log(res.data.meta);
		// 	if(res.data.meta.status !== 200){
		// 		this.$message.error("删除失败")
		// 	}
		// 	this.$message.success("删除成功");
		// 	this.getUserList();
		// })

      },
	  // 展示分配角色的对话框
	  setRole(userInof){
		  this.userInof = userInof;
		//   console.log(this.userInof);
		  getRolesListData().then(res=>{
			//   console.log(res.data.data);
			  if(res.data.meta.status !== 200){
				  this.$message.error("获取角色列表失败")
			  }
			  this.rolesList = res.data.data;
		  })
		  this.setRoleDialogVisible = true;
	  },
	  //点击确定分配角色
	  async saveRoleInfo(){
		  if(!this.selectedRoleId){
			  return this.$message.error("请选择要分配的角色!");
		  }
			// putUserRole(this.userInof.id,this.selectedRoleId).then(res=>{
			// 	console.log(res);
			// })
			const {data:res} = await this.$http.put(`users/${this.userInof.id}/role`,{
				rid:this.selectedRoleId
			})
			if(res.meta.status !== 200){
				return this.$message.error("更改角色失败(此接口不能用)")
			}
			this.$message.success("更改角色成功");
			this.getUserList();
			this.setRoleDialogVisible = false
	  },
	  //监听分配角色对话框的关闭事件
		setRoleDialogClosed(){
			this.selectedRoleId = ''
			this.userInof = {}
		}
  }
}
</script>
<style lang="less">
.el-table,.el-pagination{
	margin-top: 15px;
}
</style>
