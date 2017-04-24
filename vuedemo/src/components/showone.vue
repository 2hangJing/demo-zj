<template>
	<div style='cursor:pointer;height: 867px;' >
		<div v-show='routerData.mainShow'>
			<nav class='navbar navbar-default'>
				<div class='container' style="padding: 0;">
					<div class='collapse navbar-collapse' style="padding: 0;">
						<ul class='nav navbar-nav userNav'>
							<li><a v-bind:class="{activeBg:isActive==0}" v-on:click='link(0)'>首页</a></li>
							<li><a v-bind:class="{activeBg:isActive==1}" v-on:click='link(1)'>页面一</a></li>
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
		data(){
			return {
				isActive:this.$route.path.slice(6,7)
			}
		},
		methods:{
			go(obj,index){
				router.push({path:this.$route.path+"/con",query:{type:index}});
			},
			link(num){
				var listNum=this.$route.path.slice(6,7);
				if(listNum!=num){
					router.push("/user/"+num+"/0");
					this.isActive=this.$route.path.slice(6,7);
				}
			}
		},
		filters:{
			more(value){
				var newMessage=value.slice(0,40)+"........点击查看更多";
				return newMessage;
			}
		}
	}
</script>
<style>
	.activeBg{
		background-color: teal;
		color: white !important;
		transition: 0.5s all ease-in;
	}
	.userNav :hover{
		background-color: cornsilk;
		color: black !important;
	}
</style>