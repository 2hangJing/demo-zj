<template>
	<div style='height:700px;padding-top:100px'>
		<div>
			<img v-bind:src='routerNesting.detailedData.src' style='display:block;margin:0 auto;width:500px'>
			<br>
			<h2 v-text='routerNesting.detailedData.title'></h2>
			<p>{{routerNesting.detailedData.content}}</p>
			<button v-on:click='back' class='btn btn-success'>返回</button>
		</div>
	</div>
</template>
<script>
	import router from '.././router'
	export default{
		props:["routerNesting"],
		methods:{
			back(){
				router.push(this.$route.path.slice(0,9));
			}
		}
	}
</script>
<style></style>