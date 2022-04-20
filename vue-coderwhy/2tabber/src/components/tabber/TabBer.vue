<template>
	<div id="tabber">
		<slot></slot>
	</div>
</template>

<script>
</script>

<style lang="less">
	#tabber{
		display: flex;
		justify-content: space-around;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 49px;
		background-color: #f6f6f6;
		box-shadow: 0px -1px 1px rgba(100,100,100,.1);
		text-align: center;
	}
</style>
