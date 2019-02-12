<template>
	<router-view></router-view>
</template>

<script>
	export default {
		name: 'emerge',
		mounted () {
			this.init()
		},
		methods: {
			init () {
				this.$store.dispatch('initDb')
				this.$store.dispatch('initTemplate')
				this.$store.dispatch('initGlobalParams')
				document.addEventListener('dragover', function (e) {
					e.preventDefault()
					e.stopPropagation()
				})
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
</style>
