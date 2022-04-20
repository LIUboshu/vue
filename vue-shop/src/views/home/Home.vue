<template>
    <el-container class="home">
        <!-- 头部区域 -->
        <el-header>
			<div class="home_headSculpture">
				<img src="../../assets/logo.png" >
				<span>
					管理系统
				</span>
			</div>
            <el-button type="info" plain @click="logout">退出</el-button>
        </el-header>
        <!--主体区域-->
        <el-container>
			<!-- 侧边栏导航 -->
            <el-aside :width="isCollapse?'64px':'200px'">
				<div class="toggleBtn" @click="toggleBtn">|||</div>
				<el-menu
				      background-color="#333744"
				      text-color="#fff"
				      active-text-color="#409eff"
					  unique-opened :collapse='isCollapse' :collapse-transition="false"
					  :router="true" :default-active="activePath">
				  <el-submenu :index="'/'+item.path + ''" v-for="(item,index) in menulist" :key="item.id">
				    <!-- 这里:index id不一样控制列表单独打开  不影响其他菜单  :router="true"开启路由模式,index 作为 path 进行路由跳转-->
					<!-- 一级导航 -->
					<template slot="title">
					  <i :class="menulistIcon[item.id]"></i>
					  <span>{{item.authName}}</span>
					</template>
					<!-- 二级导航 -->
					<el-menu-item-group v-for="(itemChildren,index) in item.children" :key="itemChildren.id">
					  <el-menu-item :index="'/'+itemChildren.path" @click="saveNavState('/'+itemChildren.path)">
						<i class="el-icon-menu"></i>
						{{ itemChildren.authName }}
					  </el-menu-item>
					</el-menu-item-group>
				  </el-submenu>
				</el-menu>
			</el-aside>
			<!-- 内容区域 -->
            <el-main>
				<!-- 路由的占位符 -->
				<router-view></router-view>
			</el-main>
        </el-container>
    </el-container>
</template>

<script>
import {navHome} from 'network/home.js'
export default {
    name:"home",
	data() {
		return {
			// 左侧菜单数据
			menulist:[],
			// 左侧菜单icon
			menulistIcon:{
				'125':'el-icon-user-solid',
				'103':'el-icon-s-tools',
				'101':'el-icon-s-cooperation',
				'102':'el-icon-s-order',
				'145':'el-icon-s-data'
			},
			isCollapse:false,// 是否折叠
			activePath:''//被激活的链接地址
		}
	},
	created() {
		this.navHome();
		this.activePath = window.sessionStorage.getItem("activePath");
	},
    methods: {
        // 退出登陆
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login');
        },
		navHome(){
			navHome().then(res => {
				const navList = res.data.data;
				// console.log(navList);
				this.menulist = navList;
			})
		},
		// 收缩左侧默认菜单
		toggleBtn(){
			this.isCollapse = !this.isCollapse;
		},
		// 保存链接的激活状态
		saveNavState(activePath){
			window.sessionStorage.setItem("activePath",activePath);
			this.activePath = activePath;
		}
    }
}
</script>

<style lang="less" scoped>
.home{
    height: 100%;
    .el-header{
        background-color: #373d41;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.home_headSculpture{
			display: flex;
			align-items: center;
			img{
				width: 50px;
				height: 50px;
				border-radius: 50%;
				border: 3px solid #ccc;
			}
			span{
				font-size: 18px;
				color: #fff;
				margin-left: 10px;
			}
		}
		.el-button{
			display: flex;
			align-items: center;
		}
    }
    .el-container{
        .el-aside{
            background-color: #333744;
			.el-menu{
				border: none;
			}
			.toggleBtn{
				background-color: #4a5064;
				font-size: 10px;
				line-height: 24px;
				color: #fff;
				text-align: center;
				cursor: pointer;
			}
        }
        .el-main{
            background-color: #eaedf1;
        }
    }
}

</style>