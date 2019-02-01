import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'landing',
			component: require('@/pages/index').default
		},
		{
			path: '/template',
			name: 'template',
			component: require('@/pages/template').default
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})
