<template>
<!-- @click="itemClick"在这里监听路由 -->
	<!-- <div class="tabber-item" :class="{active:isActive}" @click="itemClick">
		<slot name="item-icon"></slot>
		<slot name="item-text"></slot>
	</div> -->

	<div class="tabber-item" @click="itemClick" :style="itemStyle">
		<slot name="item-icon"></slot>
		<slot name="item-text"></slot>
	</div>
</template>

<script>
export default {
	name:"TabberItem",
	props: {
		path:String,
		itemcolor:{
			type:String,
			default:"red"
		}
	},
	data () {
		return {
			// isActive:true
		}
	},
	computed: {
		isActive(){
			// 当前活跃的路由   是否等于 props  返回的路由
			// this.$route.path == this.path   true
			// 判断当前路由的按钮的颜色
			return this.$route.path.indexOf(this.path) !== -1
		},
		itemStyle(){
			// 判断是否处于活跃状态   如果处于活跃状态就赋值   不处于活跃则为空
			return this.isActive ? {color:this.itemcolor} : {}
		}
	},
	methods: {
		itemClick(){
			console.log(this);
			this.$router.push(this.path)
		}
	}
}
</script>

<style lang="less">
	.tabber-item{
		font-size: 14px;
		margin-top: 3px;
		span{
			font-size: 22px;
		}
	}
	// .active{
	// 	color: red;
	// }
</style>
