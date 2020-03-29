<template>
	<section>
		<div class="header_box">
			<Tooltip content="数据库" placement="right">
				<router-link tag="div" to="/" class="connect_box list_box" :class="{'active': selectRouteName === 'db'}">
					<span class="iconfont icon-lianjie"></span>
				</router-link>
			</Tooltip>
			<Tooltip content="模板" placement="right">
				<router-link tag="div" to="/template" class="connect_box list_box" :class="{'active': selectRouteName === 'template'}">
					<span class="iconfont icon-wenjianguanli"></span>
				</router-link>
			</Tooltip>
			<Tooltip content="生成器" placement="right">
				<router-link tag="div" to="/generate" class="connect_box list_box" :class="{'active': selectRouteName === 'generate'}">
					<span class="iconfont icon-chilunshezhi"></span>
				</router-link>
			</Tooltip>
			<div class="bottom_box">
				<Tooltip content="设置" placement="right">
					<router-link tag="div" to="/setting" class="connect_box list_box">
						<span class="iconfont icon-shezhitools"></span>
					</router-link>
				</Tooltip>
				<Tooltip content="退出" placement="right">
					<div class="list_box quit_button" @click="quit">
						<span class="iconfont icon-084tuichu"></span>
					</div>
				</Tooltip>
			</div>
		</div>
	</section>
</template>

<script>
	import { remote } from 'electron'
	export default {
		watch: {
			'$route'(to, from) {
				this.initRouterName()
			}
		},
		data () {
			return {
				selectRouteName: ''
			}
		},
		mounted () {
			this.initRouterName()
		},
		methods: {
			initRouterName () {
				this.selectRouteName = this.$route.name
				console.log(this.selectRouteName)
			},
			quit () {
				remote.getCurrentWindow().close()
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.header_box
		height 100%
		width 50px
		background #2d8cf0
		align-items center
		box-sizing border-box
		.list_box
			display flex
			align-items center
			justify-content center
			flex-direction column
			cursor pointer
			height 50px
			width 50px
			margin-right 10px
			color #fff
			font-size 14px
			&:hover
				background #5cadff
			&.active
				background #2b85e4
				opacity .9
		.bottom_box
			position absolute
			bottom 0
			>>>.ivu-tooltip
				display block
</style>
