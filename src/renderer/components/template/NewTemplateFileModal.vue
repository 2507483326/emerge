<template>
	<Modal v-model="isShow" :transfer="false" title="添加模板文件" width="400">
		<Form ref="form" :model="baseModel" :rules="rule" :label-width="0">
			<FormItem label="" prop="folderId" v-if="!isHasFolder">
				<Select v-model="baseModel.folderId" placeholder="请选择模板组" >
					<Option v-for="item in templateFolderList" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
			</FormItem>
			<FormItem label="" prop="name">
				<Input v-model="baseModel.name" placeholder="请输入模板文件名称"></Input>
			</FormItem>
		</Form>
		<div class="footer_box" slot="footer">
			<Button type="primary" @click="addTemplateFile">添加</Button>
		</div>
	</Modal>
</template>

<script>
	import Template from '@/model/Template'
	export default {
		data () {
			return {
				isShow: false,
				isHasFolder: false,
				content: null,
				baseModel: {
					folderId: null,
					name: ''
				},
				rule: {
					folderId: [
						{ required: true, message: '模板组不能为空' }
					],
					name: [
						{ required: true, message: '模板文件名不能为空' }
					]
				}
			}
		},
		computed: {
			templateFolderList () {
				return this.$store.state.template.templateFolderList
			}
		},
		methods: {
			show (folderId, content) {
				if (this.templateFolderList.length === 0) {
					this.$Message.warning('请先添加模板组!')
					return
				}
				this.$refs.form.resetFields()
				if (folderId) {
					this.isHasFolder = true
					this.baseModel.folderId = folderId
				} else {
					this.isHasFolder = false
					this.baseModel.folderId = this.templateFolderList[0].id
				}
				if (content) {
					this.content = content
				} else {
					this.content = null
				}
				this.isShow = true
			},
			async addTemplateFile () {
				try {
					const valid = await this.$refs.form.validate()
					if (!valid) {
						return
					}
					let template = new Template(this.baseModel)
					if (this.content) {
						template.content = this.content
					}
					await this.$store.dispatch('addTemplate', template)
					this.$Message.success('添加模板文件成功!')
					this.isShow = false
				} catch (e) {
					console.error(err)
					this.$Message.error(err.message)
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.footer_box
		display flex
		justify-content flex-end
</style>
