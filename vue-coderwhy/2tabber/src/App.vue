<template>
  <div id="app">
    <Maintabber/>
	<router-view></router-view>
  </div>
</template>
<script>
	import Maintabber from "./components/Maintabber";
	export default{
		/*
			keep-alive 是vue内置的一盒组件,可以使被包含的组件保留状态,或避免重新渲染
				有两个属性:include-字符串和正则表达,只有匹配的组件回被缓存
						  exclude字符串或正则表达式,任何匹配的组件都不会被缓存
		*/
	   name:'App',
	   components:{
		   Maintabber
	   }
	}
</script>
<style lang="less">
	@import "./assets/css/base.css";
</style>
