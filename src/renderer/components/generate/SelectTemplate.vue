<template>
	<Card class="content_box">
		<Form ref="templateForm" :model="templateModel" :labelWidth="0" :rules="templateRule">
			<FormItem class="file_select_input_box"  prop="outPath">
				<Input v-model="templateModel.outPath" placeholder="请输入模板输出目录" clearable/>
				<Button @click="selectPath">...</Button>
			</FormItem>
		</Form>
		<Divider size="small" orientation="left">模板</Divider>
		<Tree ref="templateTree" class="template_tree" :data="templateTree" show-checkbox check-directly ></Tree>
		<div class="footer">
			<Button type="primary" @click="nextStep1">下一步</Button>
		</div>
	</Card>
</template>

<script>
	import template from "../../store/modules/template";

	const { dialog } = require('electron').remote
	export default {
		data () {
			return {
				templateModel: {
					outPath: null
				},
				templateRule: {
					outPath: {
						required: true,
						message: '模板输出目录不能为空'
					}
				},
				selectTemplateList: [],
				templateTree: []
			}
		},
		mounted () {
			this.templateTree = JSON.parse(JSON.stringify(this.$store.getters.templateTree))
		},
		methods: {
			reset () {
				this.$refs.templateForm.resetFields()
				this.templateTree = JSON.parse(JSON.stringify(this.$store.getters.templateTree))
			},
			getOutputPath () {
				return this.templateModel.outPath
			},
			selectPath () {
				dialog.showOpenDialog({
					title: '选择模板输出目录',
					properties: ['openDirectory']
				}, (filePaths) => {
					if (filePaths) {
						this.templateModel.outPath = filePaths[0]
					}
				})
			},
			nextStep1 () {
				this.$refs.templateForm.validate(valid => {
					if (!valid) {
						return
					}
					this.selectTemplateList = this.$refs.templateTree.getCheckedNodes().map(item => {
						return item.id
					}).filter(item => {
						return item.folderId != null
					})
					console.log(this.$refs.templateTree.getCheckedNodes())
					console.log(this.selectTemplateList)
					this.$emit('changeStep', 1)
				})
			}
		}
	}
</script>
