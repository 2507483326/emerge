<template>
	<Modal v-model="isShow" :transfer="false" title="添加模板组" width="400">
		<Form ref="form" :model="baseModel" :rules="rule" :label-width="0">
			<FormItem label="" prop="name">
				<Input v-model="baseModel.name" placeholder="请输入模板组名称"></Input>
			</FormItem>
		</Form>
		<div class="footer_box" slot="footer">
			<Button type="primary" @click="addTemplateFolder">添加</Button>
		</div>
	</Modal>
</template>

<script>
	import TemplateFolder from '@/model/TemplateFolder'
	export default {
		data () {
			return {
				isShow: false,
				baseModel: {
					name: ''
				},
				rule: {
					name: [
						{ required: true, message: '模板组名不能为空' }
					]
				}
			}
		},
		methods: {
			show () {
				this.$refs.form.resetFields()
				this.isShow = true
			},
			async addTemplateFolder () {
				try {
					const valid = await this.$refs.form.validate()
					if (!valid) {
						return
					}
					const templateFolder = new TemplateFolder(this.baseModel)
					await this.$store.dispatch('addTemplateFolder', templateFolder)
					this.$Message.success('添加模板组成功!')
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
