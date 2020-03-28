<template>
	<Modal v-model="isShow" :transfer="false" title="新建数据库连接" width="400">
		<div class="new_db_box">
			<Form ref="form" :model="baseModel" :rules="rule" :label-width="0">
				<FormItem label="" prop="name">
					<Input v-model="baseModel.name" placeholder="请输入连接名称" maxlength="15"></Input>
				</FormItem>
				<FormItem label="" prop="dataBase">
					<Input v-model="baseModel.dataBase" placeholder="请输入数据库名称" maxlength="50"></Input>
				</FormItem>
				<FormItem label="" prop="host">
					<Input v-model="baseModel.host" placeholder="请输入数据库主机地址"  maxlength="200"></Input>
				</FormItem>
				<FormItem label="" prop="port">
					<Input v-model="baseModel.port" placeholder="请输入数据库端口号" type="number" maxlength="10"></Input>
				</FormItem>
				<FormItem label="" prop="userName">
					<Input v-model="baseModel.userName" placeholder="请输入数据库连接用户名" maxlength="100"></Input>
				</FormItem>
				<FormItem label="" prop="password">
					<Input v-model="baseModel.password" type="password" password placeholder="请输入数据库连接密码" maxlength="100"></Input>
				</FormItem>
			</Form>
		</div>
		<div class="footer_box" slot="footer">
			<Button :loading="isConnect" @click="testConnect">测试连接</Button>
			<Button class="connect_button" type="primary" :loading="isAddDb" @click="addDb">新建连接</Button>
		</div>
	</Modal>
</template>

<script>
	import { testConnect, getTableByMysql } from '@/util/JdbcUtil'
	import MysqlConnectModel from '@/model/MysqlConnectModel'
	import Db from '@/model/Db'
	export default {
		data () {
			return {
				isConnect: false,
				isShow: false,
				isAddDb: false,
				baseModel: {
					name: '',
					dataBase: '',
					host: '',
					port: '',
					userName: '',
					password: ''
				},
				rule: {
					name: [
						{ required: true, message: '连接名称不能为空' }
					],
					dataBase: [
						{ required: true, message: '数据库名称不能为空' }
					],
					host: [
						{ required: true, message: '数据库主机地址不能为空' }
					],
					port: [
						{ required: true, message: '数据库端口号不能为空' }
					],
					userName: [
						{ required: true, message: '数据库连接用户名不能为空' }
					],
					password: [
						{ required: true, message: '数据库连接密码不能为空' }
					]
				}
			}
		},
		methods: {
			show () {
				this.$refs.form.resetFields()
				this.isShow = true
			},
			async testConnect () {
				this.isConnect = true
				try {
					const mysqlConnectModel = new MysqlConnectModel(this.baseModel)
					await testConnect(mysqlConnectModel)
					this.$Message.success('连接数据库成功!')
				} catch (err) {
					console.error(err)
					this.$Message.error('新增数据库失败: ' + err.message)
				}
				this.isConnect = false
			},
			async addDb () {
				try {
					const valid = await this.$refs.form.validate()
					if (!valid) {
						return
					}
					this.isAddDb = true
					const mysqlConnectModel = new MysqlConnectModel(this.baseModel)
					const db = new Db(this.baseModel)
					const tableList = await getTableByMysql(db, mysqlConnectModel)
					await this.$store.dispatch('addDb', db)
					await this.$store.dispatch('addDbTableList', {
						id: db.id,
						tableList: tableList
					})
					console.log(this.$store)
					this.$Message.success('新增数据库连接成功')
					this.isShow = false
				} catch (err) {
					console.error(err)
					this.$Message.error('新增数据库连接失败: ' + err.message)
				}
				this.isAddDb = false
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.new_db_box
		background #fff
		padding 0 20px
	.footer_box
		display flex
		justify-content space-between
</style>
