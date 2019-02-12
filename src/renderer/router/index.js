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
			path: '/globalParams',
			name: 'globalParams',
			component: require('@/pages/globalParams').default
		},
		{
			path: '/generate',
			name: 'generate',
			component: require('@/pages/generate').default
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})
