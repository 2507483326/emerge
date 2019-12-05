<template>
	<div class="generate_box">
		<Card>
			<Steps :current="step" size="small">
				<Step title="选择模板"></Step>
				<Step title="选择数据库表"></Step>
				<Step title="完成"></Step>
			</Steps>
		</Card>
		<select-template ref="selectTemplate" v-show="step === 0" @changeStep="changeStep"></select-template>
		<select-table ref="selectTable" v-show="step === 1" @generate="generate"></select-table>
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
	import prettydiff from 'prettydiff'
	import artTemplate from 'art-template'
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
			changeStep (index) {
				this.step = index
			},
			generate () {
				this.isGenerate = true
				this.step++
				this.diffList = []
				let templateList = this.$refs.selectTemplate.$refs.templateTree.getCheckedNodes().filter(item => {
					return item.folderId != null
				})
				let tableList = this.$refs.selectTable.$refs.tableTree.getCheckedNodes().filter(item => {
					return item.tableName != null
				})
				const tableExtendTagList = this.$store.state.db.tableExtendTagList
				tableList.forEach(tableItem => {
					tableItem = JSON.parse(JSON.stringify(tableItem))
					tableExtendTagList.forEach(tableExtendTagItem => {
						if (tableExtendTagItem.tableId === tableItem.tableId && tableExtendTagItem.key) {
							tableItem[tableExtendTagItem.key] = true
						}
					})
					templateList.forEach(templateItem => {
						this.generateTemplate(tableItem, templateItem)
					})
				})
				this.isGenerate = false
			},
			generateTemplate (tableItem, templateItem) {
				const render = artTemplate.compile(templateItem.content)
				const content = render({
					table: tableItem
				})
				const outputFolder = this.$refs.selectTemplate.getOutputPath()
				const table = tableItem
				const outputPath = outputFolder + '/' + eval('`' + templateItem.outPath + '`')
				// 判断文件是否存在
				fs.ensureFileSync(outputPath)
				const originContent = fs.readFileSync(outputPath).toString()
				console.log(originContent)
				if (originContent != null && originContent !== '') {
					prettydiff.options.source = content
					prettydiff.options.diff = originContent
					const diffResult = prettydiff()
					// 需要代码合并
					if (diffResult) {
						this.diffList.push({
							outputPath: outputPath,
							tableItem: tableItem,
							templateItem: templateItem,
							content: content,
							originContent: originContent
						})
						return
					}
				}
				// 生成文件
				fs.writeFileSync(outputPath, content)
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
