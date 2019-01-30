<template>
	<Modal v-model="isShow" :middle="true">
		<!--顶部-->
		<div slot="header">新建连接</div>
		<Form ref="form" :label-position="'left'" :label-width="90" :rules="validationRules" :model="sqlConnect">
			<FormItem label="连接名" prop="name">
				<input type="text" placeholder="请输入连接名称" v-model="sqlConnect.name" />
			</FormItem>
			<FormItem label="主机" prop="mysqlHost">
				<AutoComplete :datas="sqlConnectTip.mysqlHost" placeholder="请输入主机地址" v-model="sqlConnect.mysqlHost"
							  :showDropdownWhenNoResult="false" :mustMatch="false"></AutoComplete>
			</FormItem>
			<FormItem label="端口" prop="mysqlPort">
				<AutoComplete :datas="sqlConnectTip.mysqlPort" placeholder="请输入主机端口" v-model="sqlConnect.mysqlPort"
							  :showDropdownWhenNoResult="false" :mustMatch="false"></AutoComplete>
			</FormItem>
			<FormItem label="数据库名" prop="mysqlDB">
				<input type="text" placeholder="请输入数据库名称" v-model="sqlConnect.mysqlDB" />
			</FormItem>
			<FormItem label="用户名" prop="mysqlUser">
				<input type="text" placeholder="请输入用户名" v-model="sqlConnect.mysqlUser" />
			</FormItem>
			<FormItem label="密码" prop="mysqlPassword">
				<input type="text" placeholder="请输入密码" v-model="sqlConnect.mysqlPassword" />
			</FormItem>
			<FormItem label="参数" prop="mysqlUrlParam">
				<input type="text" placeholder="请输入连接所需参数" v-model="sqlConnect.mysqlUrlParam" />
			</FormItem>
		</Form>
		<Loading text="加载中" :loading="loading"></Loading>
		<!--底部-->
		<div slot="footer" class="button_box">
			<Button @click="testConnect">测试连接</Button>
			<section class="button_box">
				<Button @click="isShow = false">取消</Button>
				<Button color="primary" @click="addDbLibrary">确定</Button>
			</section>
		</div>
	</Modal>
</template>

<script>
	import { SqlConnect } from '@/model'
	import { noRepeat } from '@/annotation'
	import ls from 'local-storage'
	import { jarTool } from '@/tools'
	import { cmd } from '@/common'
	export default {
		data () {
			return {
				isShow: false,
				sqlConnect: new SqlConnect(),
				sqlConnectTip: {
					mysqlHost: [],
					mysqlPort: []
				},
				validationRules: {
					rules: {
						name: {
							maxLen: 10,
							minLen: 1
						}
					},
					required: ['name', 'mysqlHost', 'mysqlPort', 'mysqlDB', 'mysqlUser']
				},
				loading: false
			}
		},
		mounted () {
			this.initTip()
		},
		methods: {
			initTip () {
				let sqlConnectTip = ls.get('sqlConnectTip')
				if (sqlConnectTip) {
					this.sqlConnectTip = sqlConnectTip
				}
			},
			@noRepeat
			async testConnect () {
				try {
					let validResult = this.$refs.form.valid()
					if (!validResult.result) return
					this.loading = true
					this.addAllTip()
					this.sqlConnect.groupMysqlUrl()
					await jarTool.exec(cmd.TEST_DB_CONNECT, this.sqlConnect)
					this.$Message['success']('数据库连接成功')
				} catch (e) {
					this.$Message['error']('数据库连接失败')
				} finally {
					this.loading = false
				}
			},
			@noRepeat
			async addDbLibrary () {
				try {
					let validResult = this.$refs.form.valid()
					if (!validResult.result) return
					this.addAllTip()
					this.sqlConnect.groupMysqlUrl()
					await this.$store.dispatch('addDb', this.sqlConnect)
					this.$Message['success']('新建连接成功')
					this.isShow = false
				} catch (e) {
					console.error(e)
					this.$Message['error']('新建连接失败')
				}
			},
			show () {
				this.sqlConnect = new SqlConnect()
				this.isShow = true
			},
			addAllTip () {
				this.addTip('mysqlHost', this.sqlConnect.mysqlHost)
				this.addTip('mysqlPort', this.sqlConnect.mysqlPort)
				ls.set('sqlConnectTip', this.sqlConnectTip)
			},
			addTip (name, title) {
				let isCanAdd = this.sqlConnectTip[name].some(item => {
					return item.title === this.sqlConnect[name]
				})
				if (isCanAdd) return false
				if (this.sqlConnectTip[name].length === 5) {
					this.sqlConnectTip[name].shift()
				}
				this.sqlConnectTip[name].push({
					key: JSON.stringify(title),
					title: title
				})
			},
			resetSqlConnect () {
				this.sqlConnect = new SqlConnect()
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.button_box
		display flex
		justify-content space-between
		align-items center
</style>
