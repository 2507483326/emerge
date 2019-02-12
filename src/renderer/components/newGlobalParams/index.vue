<template>
	<Modal v-model="isShow" :middle="true" class="new_global_params_box">
		<!--顶部-->
		<div slot="header">{{isAdd ? '新建' : '修改'}}函数</div>
		<Form class="form_box" ref="form" :rules="validationRules" :label-position="'left'"
			  :label-width="100" :model="params">
			<FormItem label="类型" prop="type">
				<Select v-model="params.type" :nullOption="false" placeholder="请选择类型" :datas="typeList"></Select>
			</FormItem>
			<FormItem label="名称" prop="name">
				<input type="text" placeholder="请输入名称" v-model="params.name"/>
			</FormItem>
			<FormItem label="内容" prop="value">
				<textarea v-autosize class="no_auto_width" v-model="params.value" placeholder="请输入内容"></textarea>
			</FormItem>
		</Form>
		<Loading text="加载中" :loading="loading"></Loading>
		<!--底部-->
		<div slot="footer" class="button_box">
			<section class="button_box">
				<Button @click="isShow = false">取消</Button>
				<Button class="new_global_params" color="primary" @click="formHandler">{{isAdd ? '新增' : '修改'}}
				</Button>
			</section>
		</div>
	</Modal>
</template>

<script>
	import { GlobalParamsVo } from '@/model'
	import UUID from 'uuid-js'
	import {noRepeat} from '@/annotation'
	export default {
		data () {
			return {
				isShow: false,
				isAdd: true,
				loading: false,
				typeList: [{
					key: 0,
					title: '过滤器'
				}, {
					key: 1,
					title: '变量'
				}, {
					key: 2,
					title: '方法'
				}],
				params: {
					type: 0,
					name: '',
					value: ''
				},
				validationRules: {
					rules: {
						name: {
							maxLen: 20,
							minLen: 1
						},
						value: {
							maxLen: 200,
							minLen: 1
						}
					},
					required: ['type', 'name', 'value']
				}
			}
		},
		methods: {
			getName (type) {
				return this.typeList.find(item => item.key === type).title
			},
			show (data) {
				this.isAdd = data.isAdd
				if (this.isAdd) {
					this.params = new GlobalParamsVo({
						id: UUID.create().toString(),
						type: 0,
						name: '',
						value: ''
					})
				} else {
					console.log(data.params)
					this.params = data.params
				}
				this.isShow = true
			},
			async newGlobalParams () {
				let validResult = this.$refs.form.valid()
				if (!validResult.result) return false
				let typeName = this.getName(this.params.type)
				try {
					await this.$store.dispatch('addGlobalParams', this.params)
					this.$Message['success'](`创建${typeName}成功`)
					this.isShow = false
				} catch (e) {
					console.error(e)
					this.$Message['error'](`创建${typeName}失败`)
				}
			},
			async updateGlobalParams () {
				let validResult = this.$refs.form.valid()
				if (!validResult.result) return false
				let typeName = this.getName(this.params.type)
				try {
					this.$store.dispatch('updateGlobalParams', this.params)
					this.$Message['success'](`修改${typeName}成功`)
					this.isShow = false
				} catch (e) {
					console.error(e)
					this.$Message['error'](`修改${typeName}失败`)
				}
			},
			@noRepeat
			async formHandler () {
				this.loading = true
				if (this.isAdd) {
					await this.newGlobalParams()
				} else {
					await this.updateGlobalParams()
				}
				this.loading = false
			},
		}
	}
</script>
