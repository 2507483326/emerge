<template>
	<div class="generate_box">
		<Card>
			<Steps :current="step" size="small">
				<Step title="选择模板"></Step>
				<Step title="选择数据库表"></Step>
				<Step title="完成"></Step>
			</Steps>
		</Card>
		<select-template ref="selectTemplate" v-show="step === 0" @changeStep="selectTable"></select-template>
		<select-table ref="selectTable" v-show="step === 1" :loading="loading" @generate="generate" @changeStep="changeStep"></select-table>
		<generating v-show="step === 2 && diffList.length === 0 && isGenerate"></generating>
		<generating-success @finish="reset" v-show="step === 2 && diffList.length === 0 && !isGenerate"></generating-success>
		<file-compare @finish="fileCompareFinish" ref="fileCompare"></file-compare>
	</div>
</template>

<script>
	import SelectTemplate from '@/components/generate/SelectTemplate'
	import SelectTable from '@/components/generate/SelectTable'
	import Generating from '@/components/generate/Generating'
	import FileCompare from '@/components/generate/FileCompare'
	import GeneratingSuccess from '@/components/generate/GeneratingSuccess'
	import fs from 'fs-extra'
	import prettier from 'prettier'
	import artTemplate from 'art-template'
	import path from 'path'
	export default {
		components: {
			SelectTemplate,
			SelectTable,
			Generating,
			FileCompare,
			GeneratingSuccess
		},
		data () {
			return {
				loading: false,
				step: 0,
				diffList: [],
				isGenerate: false
			}
		},
		watch: {
			diffList (newVal) {
				if (newVal && newVal.length > 0) {
					if (!this.$refs.fileCompare.isShow) {
						this.$refs.fileCompare.show(newVal[0])
					}
				}
			}
		},
		methods: {
			reset () {
				this.step = 0
				this.diffList = []
				this.isGenerate = false
				this.$refs.selectTemplate.reset()
				this.$refs.selectTable.reset()
			},
			fileCompareFinish () {
				this.$nextTick(() => {
					this.diffList.splice(0, 1)
				})
			},
			selectTable (index) {
				this.$refs.selectTable.reset()
				this.step = index
			},
			changeStep (index) {
				this.step = index
			},
			generate () {
				try {
					if (this.loading) {
						return
					}
					this.loading = true
					this.isGenerate = true
					this.diffList = []
					let templateList = this.$refs.selectTemplate.$refs.templateTree.getCheckedNodes().filter(item => {
						return item.folderId != null
					})
					let tableList = this.$refs.selectTable.$refs.tableTree.getCheckedNodes().filter(item => {
						return item.tableName != null
					})
					if (tableList == null || tableList.length == 0) {
						this.$Message.error('请选择要生成的表!')
						return
					}
					const tableExtendTagList = this.$store.state.db.tableExtendTagList
					tableList.forEach(tableItem => {
						tableItem = JSON.parse(JSON.stringify(tableItem))
						tableItem.columns.forEach(columnItem => {
							tableExtendTagList.forEach(tableExtendTagItem => {
								if (tableExtendTagItem.columnId === columnItem.columnId) {
									columnItem[tableExtendTagItem.key] = true
								}
							})
						})
						templateList.forEach(templateItem => {
							this.generateTemplate(tableItem, templateItem)
						})
					})
					this.isGenerate = false
					this.step++
					this.loading = false
				} catch (e) {
					this.loading = false
					console.error(e)
					this.$Message.error('生成模板失败!')
				}
			},
			generateTemplate (tableItem, templateItem) {
				const render = artTemplate.compile(templateItem.content)
				let table = tableItem
				let content = render({
					table: tableItem
				})
				const outputFolder = this.$refs.selectTemplate.getOutputPath()
				if (templateItem.outPath == null || templateItem.outPath == '') {
					this.$Message.error('模板: [' + templateItem.name + '] 输出路径不能为空!')
					throw new Error('生成模板错误,输出路径不能为空')
					return
				}
				console.log(templateItem.outPath)
				console.log('`' + templateItem.outPath + '`')
				console.log(table)
				console.log(`${table.lowerCaseTableName}`)
				const nameFunc = new Function('table', 'return ' + '`' + templateItem.outPath + '`')
				const outputPath = outputFolder + '/' + nameFunc(table)
				console.log(outputPath)
				fs.ensureFileSync(path.normalize(outputPath))
				// 生成文件 直接覆盖
				console.log(content)
				content = this.format(outputPath, content)
				fs.writeFileSync(path.normalize(outputPath), content)
			},
			format (outputPath, content) {
				try {
					let config = {
						"printWidth": 9999999,
						"singleQuote": true,
						"semi": false
					}
					// 如果用户选择自定义prettier配置
					if (this.$store.state.common.enablePrettierPath) {
						let userConfig = fs.readFileSync(path.normalize(this.$store.state.common.prettierPath))
						config = JSON.parse(userConfig.toString())
					}
					if (path.extname(outputPath) === '.js') {
						config.parser = 'babel'
						return prettier.format(content, config)
					}
					if (path.extname(outputPath) === '.vue') {
						config.parser = 'vue'
						return prettier.format(content, config)
					}
					return content
				} catch (err) {
					console.log('格式化失败', err)
					return content
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.generate_box
		position relative
		display flex
		height 100%
		flex-direction column
		/deep/.content_box
			flex 1
			overflow hidden
			.ivu-card-body
				height 100%
				display flex
				flex-direction column
				.template_tree
					flex 1
					overflow auto
				.table_tree
					flex 1
					overflow auto
		/deep/.ivu-card
			margin 10px
		/deep/.footer
			display flex
			justify-content flex-end
			.ivu-btn
				margin 10px

		/deep/.file_select_input_box
			.ivu-form-item-content
				display flex
				.ivu-btn
					margin-left 10px
</style>
