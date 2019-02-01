<template>
	<Modal v-model="isShow" :middle="true">
		<!--顶部-->
		<div slot="header">新建模板文件夹</div>
		<Form ref="form" :label-position="'left'" :label-width="60" :rules="validationRules" :model="templateData">
			<FormItem label="路径" prop="name">
				<input type="text" placeholder="请输入路径名称" v-model="templateData.path" />
				<Button icon="iconfont icon-gengduo" class="select_path" @click="selectPath"></Button>
			</FormItem>
		</Form>
		<Loading text="加载中" :loading="loading"></Loading>
		<!--底部-->
		<div slot="footer" class="button_box">
			<section class="button_box">
				<Button @click="isShow = false">取消</Button>
				<Button color="primary" @click="addTemplateFolder">确定</Button>
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
					path: ''
				},
				validationRules: {
					required: ['path']
				},
				isShow: false,
				loading: false,
				isShowSelectPath: false
			}
		},
		methods: {
			show () {
				this.templateData = {
					path: ''
				}
				this.isShow = true
			},
			@noRepeat
			async addTemplateFolder () {
				this.loading = true
				try {
					let validResult = this.$refs.form.valid()
					if (!validResult.result) return false
					let pathArray = this.templateData.path.replace('/', '\\').split('\\')
					let folderName = pathArray[pathArray.length - 1]
					await this.$store.dispatch('addTemplateFolder', {
						name: folderName,
						path: this.templateData.path
					})
					this.$Message['success']('创建模板文件夹成功')
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
	.h-form
		.h-form-item
			>>> .h-form-item-wrap
				display flex
				.select_path
					word-break keep-all
					margin-left 10px
					.iconfont
						font-size 13px
			&:last-child
				padding-bottom 0
</style>
