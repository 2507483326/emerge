import Vue from 'vue'
import VueRouter from 'vue-router'
import Db from '@/views/Db.vue'
import Template from '@/views/Template'
import TemplateDetail from '@/views/TemplateDetail'
import TemplateEmptyDetail from '@/views/TemplateEmptyDetail'
import Generate from '@/views/Generate'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'db',
		component: Db
	},
	{
		path: '/template',
		name: 'template',
		component: Template,
		children: [
			{
				path: '/',
				name: 'template',
				component: TemplateEmptyDetail
			},
			{
				path: 'detail/:folderId/:templateId',
				name: 'template',
				component: TemplateDetail
			}
		]
	},
	{
		path: '/generate',
		name: 'generate',
		component: Generate
	},
	{
		path: '*',
		redirect: '/'
	}
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

export default router
