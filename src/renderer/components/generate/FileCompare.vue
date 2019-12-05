<template>
	<Card class="content_box" v-show="isShow">
		<div class="content" ref="editor"></div>
		<div class="footer">
			<Button @click="jump">跳过</Button>
			<Button type="primary" @click="nextStep">确认</Button>
		</div>
	</Card>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import fs from 'fs-extra'
export default {
	data () {
		return {
			isShow: false,
			diffItem: null,
			monacoEditor: null
		}
	},
	methods: {
		show (diffItem) {
			this.diffItem = diffItem
			console.log(this.diffItem)
			this.isShow = true
			this.initEditor()
		},
		initEditor () {
			if (this.monacoEditor) {
				this.monacoEditor.dispose()
			}
			this.monacoEditor = monaco.editor.createDiffEditor(this.$refs.editor, {
				enableSplitViewResizing: false,
				automaticLayout: true
			})
			let originalModel = monaco.editor.createModel(this.diffItem.content, this.diffItem.templateItem.language)
			let modifiedModel = monaco.editor.createModel(this.diffItem.originContent, this.diffItem.templateItem.language)
			this.monacoEditor.setModel({
				original: originalModel,
				modified: modifiedModel
			});
		},
		jump () {
			this.$emit('finish')
			this.isShow = false
		},
		nextStep () {
			// 生成文件
			fs.writeFileSync(this.diffItem.outputPath, this.monacoEditor.getModifiedEditor().getValue())
			this.$emit('finish')
			this.isShow = false
		}
	}
}
</script>

<style lang="stylus" scoped>
	.content_box
		.content
			flex 1
	.footer
		justify-content space-between !important
</style>
