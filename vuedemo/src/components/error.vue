<template>
	<div style="margin-top: 150px;">
		<h1 style="text-align: center;">遥远的404！</h1>
		<div style="width: 150px;margin: 50px auto;">
			<button v-on:click="jump(0)" class="btn btn-primary">首页</button>
			<button v-on:click="jump(1)" class="btn btn-primary">第一页</button>
		</div>
	</div>
</template>
<script>
	import router from '.././router'
	export default{
		methods:{
			jump(num){
				num==0?router.push("/user/0/0"):router.push("/user/1/0");
			}
		}
	}
</script>
<style></style>