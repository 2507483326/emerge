<template>
	<section>
		<div class="header_box">
			<router-link tag="div" to="/" class="connect_box list_box">
				<div class="iconfont icon-shebeilianjiehoubiaozhi"></div>
				<div class="content">连接</div>
			</router-link>
			<router-link tag="div" to="/template" class="connect_box list_box">
				<div class="iconfont icon-moban"></div>
				<div class="content">模板</div>
			</router-link>
		</div>
	</section>
</template>

<script>
	export default {
		data () {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style lang="stylus" scoped>
	.header_box
		height 100px
		background #fff
		display flex
		align-items center
		box-sizing border-box
		padding 5px 10px
		.list_box
			display flex
			align-items center
			justify-content center
			flex-direction column
			cursor pointer
			height 90px
			width 90px
			border-radius 10px
			border 1px solid #eee
			margin-right 10px
			&:hover
				background #eee
			.iconfont
				font-size 40px
				color #3788ee
			.content
				font-size 12px
</style>
