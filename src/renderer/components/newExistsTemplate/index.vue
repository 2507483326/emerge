<template>
	<Modal v-model="isShow" :middle="true">
		<!--顶部-->
		<div slot="header">导入模板</div>
		<Form ref="form" :label-position="'left'" :label-width="100" :rules="validationRules" :model="templateData">
			<FormItem label="名称" prop="name">
				<input type="text" placeholder="请输入模板名称" v-model="templateData.name" />
			</FormItem>
			{{templateData}}
			<FormItem label="模板文件夹" prop="folderId">
				<Select v-model="templateData.folderId" :nullOption="false"
						placeholder="选择新增模板文件夹" :datas="templateFolder" ></Select>
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
	import { template } from '@/mixins'
	import { mapGetters } from 'vuex'
	export default {
		mixins: [template],
		data () {
			return {
				templateData: {
					name: '',
					folderId: null
				},
				test: null,
				validationRules: {
					required: ['name', 'folder']
				},
				file: null,
				isShow: false,
				loading: false,
				isShowSelectPath: false
			}
		},
		computed: {
			...mapGetters({
				templateList: 'templateList'
			}),
			templateFolder () {
				return this.templateList.filter(item => {
					return item.isFolder === true
				}).map(item => {
					return {
						key: item.id,
						title: item.name
					}
				})
			}
		},
		methods: {
			show (file) {
				this.file = file
				this.$set(this.templateData, 'name', this.getFileName(file))
				this.$set(this.templateData, 'folderId', this.templateFolder[0].key)
				this.isShow = true
			},
			getFileName (file) {
				let filePath = file.path
				var namePos = filePath.lastIndexOf("\\")
				return filePath.substring(namePos + 1).split('.')[0]
			},
			@noRepeat
			async addTemplate () {
				this.loading = true
				try {
					let validResult = this.$refs.form.valid()
					if (!validResult.result) return false
					if (this.isHasTemplateName(this.templateData.name)) {
						this.$Message['warn']('模板名称已存在!')
						return
					}
					await this.$store.dispatch('addExistsTemplate', {
						folderId: this.templateData.folderId,
						name: this.templateData.name,
						file: this.file
					})
					this.$Message['error']('导入模板文件成功!')
					this.isShow = false
				} catch (e) {
					console.error(e)
					this.$Message['error']('导入模板文件失败!')
				} finally {
					this.loading = false
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>

</style>
