<template>
	<div id="app">
		<base-header></base-header>
		<div class="main">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import BaseHeader from '@/components/layout/BaseHeader'
	export default {
		name: 'emerge',
		components: {
			BaseHeader
		},
		mounted () {
			this.disableDefaultDrag()
		},
		methods: {
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

<style lang="stylus">
	@import "assets/font/iconfont.css"
	*
		box-sizing border-box
	#app
		display flex
		height 100vh
		.main
			flex 1
	::-webkit-scrollbar
		width 6px
		height 6px

	/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/

	::-webkit-scrollbar-track
		width 6px
		background-color transparent
		-webkit-border-radius 2em
		-moz-border-radius 2em
		border-radius 2em

	/*滚动条的设置*/

	::-webkit-scrollbar-thumb
		background-color rgba(147, 155, 166, .5)
		background-clip padding-box
		min-height 28px
		-webkit-border-radius 2em
		-moz-border-radius 2em
		border-radius 2em
	/*滚动条移上去的背景*/

	::-webkit-scrollbar-thumb:hover
		background-color rgba(147, 155, 166, .9)
	.ivu-modal-wrap
		.ivu-modal
			top 0
			height 100%
			.ivu-modal-content
				position absolute
				width 100%
				top: 50%
				transform translate(0, -50%)
</style>
