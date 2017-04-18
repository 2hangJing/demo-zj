import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import tem from '@/components/showone'
import tem_cont from '@/components/showtwo'
import tem_error from '@/components/error'

//安装插件
Vue.use(Router)
Vue.use(VueResource)

export default new Router({
	routes:[
		{
			path:"/user/:list/:listNum",
			component:tem,
			children:[
				{
					path:"con",
					component:tem_cont
				}
			]
		},
		{
			path:"/user/error",
			component:tem_error
		}
	]
})
