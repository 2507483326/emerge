<template>
	<section class="container">
		<base-header></base-header>
		<table-menu :model="item" :key="item.name" v-for="item in menuList"></table-menu>
	</section>
</template>

<script>
	import tableMenu from '@/components/tableMenu'
	import baseHeader from '@/components/baseHeader'
	import { Menu } from '@/model'
	export default {
		data () {
			return {
				menuList: []
			}
		},
		mounted () {
			this.addDbLibrary()
		},
		methods: {
			addDbLibrary () {
				this.menuList.push(new Menu({
					id: 0,
					name: 'test1',
					isDbLibrary: true
				}))
			}
		},
		components: {
			baseHeader,
			tableMenu
		}
	}
</script>

<style lang="stylus" scoped>
	/* CSS */
</style>
