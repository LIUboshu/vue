<template>
   <tab-ber>
		<tabber-item path="/home" itemcolor='blue'>
			<span slot="item-icon" class="iconfont icon-home"></span>
			<div slot="item-text">首页</div>
		</tabber-item>
		<tabber-item path="/about" itemcolor='pink'>
			<span slot="item-icon" class="iconfont icon-app"></span>
			<div slot="item-text">分类</div>
		</tabber-item>
		<tabber-item path="/cart" itemcolor='green'>
			<span slot="item-icon" class="iconfont icon-cart"></span>
			<div slot="item-text">购物车</div>
		</tabber-item>
		<tabber-item path="/profile">
			<span slot="item-icon" class="iconfont icon-my"></span>
			<div slot="item-text">我的</div>
		</tabber-item>
	</tab-ber>
</template>

<script>
    import TabBer from './tabber/TabBer.vue'
	import TabberItem from './tabber/TabberItem.vue'
export default {
    name:"Maintabber",
    components: {
        TabBer,
		TabberItem
    }
}
</script>

<style>

</style>