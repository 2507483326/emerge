<template>
	<Modal v-model="isShow" :middle="true">
		<!--顶部-->
		<div slot="header">新建连接</div>
		<Form ref="form" :label-position="'left'" :label-width="90" :rules="validationRules" :model="sqlConnect">
			<FormItem label="连接名" prop="name">
				<input type="text" placeholder="请输入连接名称" v-model="sqlConnect.name" />
			</FormItem>
			<FormItem label="主机" prop="mysqlHost">
				<input type="text" placeholder="请输入主机地址" v-model="sqlConnect.mysqlHost" />
			</FormItem>
			<FormItem label="端口" prop="mysqlPort">
				<NumberInput placeholder="请输入主机端口" v-model="sqlConnect.mysqlPort" />
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
	export default {
		data () {
			return {
				isShow: false,
				sqlConnect: new SqlConnect(),
				validationRules: {
					rules: {
						name: {
							maxLen: 10,
							minLen: 1
						}
					},
					required: ['name', 'mysqlHost', 'mysqlPort', 'mysqlDB', 'mysqlUser']
				}
			}
		},
		methods: {
			testConnect () {
				let validResult = this.$refs.form.valid()
				console.log(validResult)
				if (!validResult.result) return
				this.sqlConnect.groupMysqlUrl()
				this.$emit('testConnect', this.sqlConnect)
			},
			addDbLibrary () {
				this.sqlConnect.groupMysqlUrl()
				this.$emit('addDbLibrary', this.sqlConnect)
			},
			show () {
				this.isShow = true
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
