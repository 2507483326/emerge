<template>
	<Modal v-model="isShow" :middle="true">
		<!--顶部-->
		<div slot="header">新建模板</div>
		<Form ref="form" :label-position="'left'" :label-width="60" :rules="validationRules" :model="templateData">
			<FormItem label="名称" prop="name">
				<input type="text" placeholder="请输入模板名称" v-model="templateData.name" />
			</FormItem>
		</Form>
		<Loading text="加载中" :loading="loading"></Loading>
		<!--底部-->
		<div slot="footer" class="button_box">
			<section class="button_box">
				<Button @click="isShow = false">取消</Button>
				<Button color="primary" @click="addTemplate">确定</Button>
			</section>
		</div>
	</Modal>
</template>

<script>
	import { noRepeat } from '@/annotation'
	const { dialog } = require('electron').remote
	export default {
		data () {
			return {
				templateData: {
					name: ''
				},
				validationRules: {
					required: ['name']
				},
				model: null,
				isShow: false,
				loading: false,
				isShowSelectPath: false
			}
		},
		methods: {
			show (model) {
				this.templateData = {
					name: ''
				}
				this.model = model
				this.isShow = true
			},
			@noRepeat
			async addTemplate () {
				this.loading = true
				try {
					let validResult = this.$refs.form.valid()
					if (!validResult.result) return false
					this.$store.dispatch('addTemplate', {
						folderId: this.model.id,
						name: this.templateData.name
					})
					this.isShow = false
				} catch (e) {
					console.error(e)
					this.$Message['error']('创建模板文件夹失败')
				} finally {
					this.loading = false
				}
			},
			selectPath () {
				console.log(this.isShowSelectPath)
				if (this.isShowSelectPath) return
				this.isShowSelectPath = true
				dialog.showOpenDialog({
					title: '选择模板文件夹',
					properties: ['openDirectory']
				}, (filePaths) => {
					if (filePaths) {
						this.templateData.path = filePaths[0]
					}
					this.isShowSelectPath = false
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>

</style>
