<template>
	<section>
		<div class="header_box">
			<div class="connect_box list_box" @click="open">
				<div class="iconfont icon-shebeilianjiehoubiaozhi"></div>
				<div class="content">连接</div>
			</div>
		</div>
		<!--弹窗-->
		<section class="modal_box">
			<new-connect-model ref="newConnectModel" @testConnect="testConnect" @addDbLibrary="addDbLibrary"></new-connect-model>
		</section>
	</section>
</template>

<script>
	import newConnectModel from '@/components/newConnectModel'
	import { jarTool } from '@/tools'
	import { cmd } from '@/common'
	export default {
		data () {
			return {
			}
		},
		methods: {
			open () {
				this.$refs.newConnectModel.show()
			},
			testConnect (sqlConnect) {
				jarTool.exec(cmd.TEST_DB_CONNECT, sqlConnect).then(re => {
					console.log(re)
				}).catch(err => {
					console.error(err)
					this.$Message['error']('数据库连接失败')
				})
			},
			addDbLibrary (sqlConnect) {
				console.log(sqlConnect)
			}
		},
		components: {
			newConnectModel
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
			&:hover
				background #eee
			.iconfont
				font-size 40px
				color #3788ee
			.content
				font-size 12px
</style>
