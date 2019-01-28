<template>
	<div>
		<table-menu :model="treeData"></table-menu>
	</div>
</template>

<script>
	import tableMenu from '@/components/tableMenu'

	export default {
		data () {
			return {
				treeData: {
					name: 'My Tree',
					children: [
						{name: 'hello'},
						{name: 'wat'},
						{
							name: 'child folder',
							children: [
								{
									name: 'child folder',
									children: [
										{name: 'hello'},
										{name: 'wat'}
									]
								},
								{name: 'hello'},
								{name: 'wat'},
								{
									name: 'child folder',
									children: [
										{name: 'hello'},
										{name: 'wat'}
									]
								}
							]
						}
					]
				}
			}
		},
		components: {
			tableMenu
		}
	}
</script>

<style lang="stylus" scoped>
	/* CSS */
</style>
