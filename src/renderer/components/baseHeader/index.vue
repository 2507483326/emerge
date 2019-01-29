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
			<Modal v-model="newConnect" :middle="true">
				<!--顶部-->
				<div slot="header">新建连接</div>
				<div class="connect_input">
					<div class="name mast">连接名</div>
					<input type="text" placeholder="连接名" v-model="sqlConnect.name"/>
				</div>
				<div class="connect_input">
					<div class="name mast">主机</div>
					<input type="text" placeholder="主机" v-model="sqlConnect.mysqlHost"/>
				</div>
				<div class="connect_input">
					<div class="name mast">端口</div>
					<input type="text" placeholder="端口" v-model="sqlConnect.mysqlPort"/>
				</div>
				<div class="connect_input">
					<div class="name mast">数据库名</div>
					<input type="text" placeholder="数据库名" v-model="sqlConnect.mysqlDB"/>
				</div>
				<div class="connect_input">
					<div class="name mast">用户名</div>
					<input type="text" placeholder="用户名" v-model="sqlConnect.mysqlUser"/>
				</div>
				<div class="connect_input">
					<div class="name">密码</div>
					<input type="text" placeholder="密码" v-model="sqlConnect.mysqlPassword"/>
				</div>
				<div class="connect_input">
					<div class="name">参数</div>
					<input type="text" placeholder="参数" v-model="sqlConnect.mysqlUrlParam"/>
				</div>
				<!--底部-->
				<div slot="footer" class="button_box">
					<Button @click="testConnect">测试连接</Button>
					<section class="button_box">
						<Button @click="newConnect = false">取消</Button>
						<Button color="primary" @click="addDbLibrary">确定</Button>
					</section>
				</div>
			</Modal>
		</section>
	</section>
</template>

<script>
	import { SqlConnect } from '@/model'
	import { jarTool } from '@/tools'
	import { cmd } from '@/common'
	export default {
		data () {
			return {
				newConnect: false,
				sqlConnect: new SqlConnect()
			}
		},
		methods: {
			open () {
				console.log(this.newConnect)
				this.newConnect = true
			},
			testConnect () {
				this.sqlConnect.groupMysqlUrl()
				console.log(this.sqlConnect)
				jarTool.exec(cmd.TEST_DB_CONNECT, this.sqlConnect).then().catch(err => {
					console.log(err)
				})
			},
			addDbLibrary () {
				this.sqlConnect.groupMysqlUrl()
				console.log(this.sqlConnect)
			}
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
	.connect_input
		display flex
		align-items center
		margin-bottom 10px
		&:last-child
			margin-bottom 0
		.name
			width 80px
			display flex
			justify-content flex-end
			margin-right 20px
			&.mast
				&::before
					content "*"
					color #f1556c
					font-size 12px
					display inline-block
					margin-right 4px
	.button_box
		display flex
		justify-content space-between
		align-items center
	input
		display block
		flex 1
</style>
