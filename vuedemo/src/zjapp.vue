<template>
	<div class="container">
		<div class="row">
			<div id="index" class="col-xs-12 col-lg-12 col-md-12" style="padding: 0;">
				<transition name='animate' appear mode='out-in'>
					<router-view v-bind:router-data="allData" v-bind:key="change" v-on:detailback="load" v-on:jump="detailShow"></router-view>
				</transition>
				<div style="" v-show="allData.mainShow">
					<transition-group name='animate' appear mode='out-in' tag="div">
						<button v-show="back" v-bind:key="back" class="btn btn-success" v-on:click="dosom('back')">上一页</button>
						<button v-show="next" v-bind:key="next" class="btn btn-success" v-on:click="dosom('next')">下一页</button>
					</transition-group>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import router from './router'
	export default{
		data:function(){
			return{
				allData:{
					showData:null,
					detailedData:{},
					num:0,
					list:0,
					mainShow:true
				},
				change:true,
				back:0,
				next:1
			}
		},
		beforeMount:function(){
			this.$route.path=="/"?router.push("/user/0/0"):null;
			this.load();
		},
		methods:{
			buttonToggle:function(){
				var nowNum=this.allData.num;
				this.back=nowNum;
				console.log(this.back);
				this.next=2-nowNum;
			},
			dosom:function(str){
				str=="next"?this.allData.num++:this.allData.num--;
				this.buttonToggle();
				//当前user/当前页面/当前页面路由
				router.push(this.$route.path.slice(0,8)+this.allData.num);
				this.load();
			},
			load:function(){
				var vmThis=this,
					numData=null,
					listData=null;
				// /user/当前页面/numData
				numData=this.$route.path.slice(8,9);
				listData=this.$route.path.slice(6,7);
				// 初始化
				this.allData.num=numData;
				this.buttonToggle();
				this.change=!this.change;
				if(this.$route.path.indexOf("con")>0){
					//获取list中第几个
					var typeData=this.$route.query.type;
					this.$nextTick(function(){
						vmThis.$http.get("static/data-"+listData+".json").then(function(rea){
							var listNum=rea.body.allData.slice(numData*6,numData*6+6);
							vmThis.allData.detailedData=listNum.slice(typeData,typeData+1)[0];
						});
					});
					this.allData.mainShow=false;
				}else{
					this.$nextTick(function(){
						vmThis.$http.get("static/data-"+listData+".json").then(function(rea){
							vmThis.allData.showData=rea.body.allData.slice(numData*6,numData*6+6);
						});
					});
					this.allData.mainShow=true;
				}
			},
			detailShow:function(obj,index){
				router.push({path:this.$route.path+"/con",query:{num:this.$route.query.num,type:index}});
				this.load();
			}
		}
	}
	
</script>
<style>
	.animate-enter-active,.animate-leave-active{
		transition: all 0.5s ease;
	}
	.animate-enter{
		transform: translateX(-50px);
		opacity: 0;
	}
	.animate-leave-active{
		transform: translateX(50px);
		opacity: 0;
	}
</style>
