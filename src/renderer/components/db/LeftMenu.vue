<template>
	<div class="menu_list_box">
		<db-list @selectTable="selectTable"></db-list>
	</div>
</template>

<script>
	import DbList from './DbList'
	export default {
		components: {
			DbList
		},
		methods: {
			selectTable (tableModel) {
				this.$emit('selectTable', tableModel)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.menu_list_box
		height 100%
		overflow-y auto
</style>
