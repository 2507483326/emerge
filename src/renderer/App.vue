<template>
	<router-view></router-view>
</template>

<script>
	export default {
		name: 'emerge',
		mounted () {
			this.init()
			this.disableDefaultDrag()
		},
		methods: {
			async init () {
				console.log('init')
				await this.$store.dispatch('initDb')
				await this.$store.dispatch('initTemplate')
				await this.$store.dispatch('initGlobalParams')
			},
			disableDefaultDrag () {
				document.addEventListener('dragover', (event) => {
					event.preventDefault()
				}, false)
				document.addEventListener('dragend', (event) => {
					event.preventDefault()
				}, false)
				document.addEventListener('dragstart', (event) => {
					event.preventDefault()
				}, false)
				document.addEventListener('drag', (event) => {
					event.preventDefault()
				}, false)
				document.addEventListener('dragenter', (event) => {
					event.preventDefault()
				}, false)
				document.addEventListener('dragleave', (event) => {
					event.preventDefault()
				}, false)
			}
		}
	}
</script>

<style lang="less">
	@import (less) "~heyui/themes/var.less";
	@import (less) "~heyui/themes/common.less";
</style>

<style lang="stylus">
	/* CSS */
	*
		padding 0
		margin 0
	html,body
		height 100%
	body
		background #f3f6f8
	.container
		height 100%
		display flex
		flex-direction column
	.h-tooltip
		word-break break-all
	.no_auto_width
		resize none
	.no_data_tip_box
		padding 0 10px
		color #999999
		z-index -1
		user-select none
		cursor default
</style>
