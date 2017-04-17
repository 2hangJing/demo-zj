<template>
	<div style='cursor:pointer;' >
		<div v-show='routerData.mainShow'>
			<nav class='navbar navbar-default'>
				<div class='container'>
					<div class='navbar-header'>
						<a class='navbar-brand' v-on:click='link(0)'>首页</a>
					</div>
					<div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
						<ul class='nav navbar-nav'>
							<li><a v-on:click='link(1)'>页面一</a></li>
							<li><a v-on:click='link(2)'>页面二</a></li>
						</ul>
					</div>
				</div>
			</nav>
			<div class='media' v-for='(item,index) in routerData.showData' v-on:click='go(item,index)'>
				<div>
					<div class='media-left'>
						<img class='media-object' v-bind:src='item.thumbnail'>
					</div>
					<div class='media-body'>
						<h2 class='media-heading' v-text='item.title'></h2>
						<span style='font-size:25px;color:#ccc'>{{item.content | more}}</span>
					</div>
				</div>
			</div>
		</div>
		<router-view v-bind:router-nesting='routerData'></router-view>
	</div>
</template>
<script>
	import router from '.././router'
	export default{
		props:["routerData"],
		methods:{
			go:function(obj,index){
				this.$emit("jump",obj,index);
			},
			detailback:function(){
				this.$emit("detailback");
			},
			link:function(num){
				router.push("/user/"+num+"/0");
			}
		},
		filters:{
			more:function(value){
				var newMessage=value.slice(0,40)+"........点击查看更多";
				return newMessage;
			}
		},
		watch:{
			"$route":function(){
				this.detailback();
			}
		}
	}
</script>
<style></style>