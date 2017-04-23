<template>
	<div class="container">
		<div class="row">
			<div id="index" class="col-xs-12 col-lg-12 col-md-12" style="padding: 0;">
				<transition name='animate' appear mode='out-in'>
					<router-view v-bind:router-data="allData" v-bind:key="change" v-on:detailback="load" v-on:jump="detailShow"></router-view>
				</transition>
				<transition name='btn' appear mode='out-in'>
					<div style="" v-show="allData.mainShow" style="overflow: hidden; width: 140px;height: 34px;position: relative;margin-top: 15px;">
						<button style="position: absolute;top: 0;left: 0;" v-show="back==0?false:true" v-bind:key="back" class="btn btn-success" v-on:click="dosom('back')">上一页</button>
						<button style="position: absolute;bottom: 0;right: 0;" v-show="next==0?false:true" v-bind:key="next" class="btn btn-success" v-on:click="dosom('next')">下一页</button>
					</div>
				</transition>
				<div v-show="loading" style="position: fixed;background-color: rgb(255,255,255);height: 100%;width: 100%;top:0;left: 0;background-color: tan;">
					<img src="../static/loading/loading.gif" style="position: absolute; top: 0;bottom: 0;left: 0;right: 0;display: block;" alt="" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import router from './router'
	export default{
		data(){ 
			return{
				allData:{
					showData:null,
					detailedData:{},
					num:0,
					list:0,
					mainShow:true
				},
				loading:false,
				change:true,
				back:0,
				next:1,
			}
		},
		beforeMount(){
			this.routePath();
		},
		watch:{
			"$route"(to){
				this.routePath();
			}
		},
		methods:{
			buttonToggle(){
				var nowNum=this.allData.num;
				this.back=nowNum;
				this.next=2-nowNum;
			},
			dosom(str){
				str=="next"?this.allData.num++:this.allData.num--;
				this.buttonToggle();
				//当前user/当前页面/当前页面路由
				router.push(this.$route.path.slice(0,8)+this.allData.num);
			},
			routePath(){
				if(this.$route.fullPath=="/"){
					router.push("/user/0/0");
					this.load();
				}
				else if(this.$route.fullPath.length==9 || this.$route.fullPath.length==20){
					this.load();
				}
				else{
					router.push("/user/error");
					this.back=0;
					this.next=0;
				}
			},
			load(){
				var numData=null,
					listData=null;
					
				// /user/lisData/numData
				numData=this.$route.path.slice(8,9);
				listData=this.$route.path.slice(6,7);
				
				// 初始化
				this.allData.num=numData;
				this.buttonToggle();
				this.change=!this.change;
				if(this.$route.path.indexOf("con")>0){
					//获取list中第几个
					var typeData=this.$route.query.type;
					this.$nextTick(e=>{
						this.$http.get("static/data-"+listData+".json").then(rea=>{
							this.loading=true;
							setTimeout(e=>{
							
								//vue-resource加载数据存在于data.body中
								var listNum=rea.body.allData.slice(numData*6,numData*6+6);
								
								//详细显示页面数据来源
								this.allData.detailedData=listNum.slice(typeData,typeData+1)[0];
								
								this.loading=false;
								
							},600);
						});
							
					});
					this.allData.mainShow=false;
				}else{
					this.$nextTick(e=>{
						this.loading=true;
						setTimeout(e=>{
							this.$http.get("static/data-"+listData+".json").then(rea=>{
								this.allData.showData=rea.body.allData.slice(numData*6,numData*6+6);
								this.loading=false;
							});
						},600);
					});
					this.allData.mainShow=true;
				}
			},
			detailShow(obj,index){
				router.push({path:this.$route.path+"/con",query:{type:index}});
			}
		}
	}
	
</script>
<style>
	/*切换中动画*/
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
	/*底部按钮简单动画*/
	.btn-enter-active,.btn-leave-active{
		transition: all 1s ease;
	}
	.btn-enter{
		opacity: 0;
	}
	.btn-leave-active{
		opacity: 0;
	}
	
</style>
