<template>
	<div ref="editorBox" class="editor_wrap">
		<div ref="editor" class="editor"></div>
	</div>
</template>

<script>
	import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
	import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
	import * as monaco from 'monaco-editor/esm/vs/editor/edcore.main'
	import '@/assets/lib/monaco/language'
	import fs from 'fs-extra'

	export default {
		props: {
			model: null
		},
		data () {
			return {
				monacoEditor: null
			}
		},
		mounted () {
		},
		methods: {
			renderEditor () {
				console.log(this.model)
				if (!this.monacoEditor) {
					this.initEditor()
				}
				// this.readFile()
				// this.monacoEditor.setValue('test')
			},
			initEditor () {
				this.monacoEditor = monaco.editor.create(this.$refs.editor, {
					value: [
						'function x() {',
						'\tconsole.log("Hello world!");',
						'}'
					].join('\n'),
					language: 'css'
				})
				this.monacoEditor.onDidChangeModelContent(this.changeContent)
			},
			readFile () {
				fs.ensureFileSync(this.model.path)
				let result = fs.readFileSync(this.model.path) + ""
				console.log(result)
			},
			async saveFile () {
				console.log(this.monacoEditor.getValue())
				await fs.writeFileSync(this.model.path, this.monacoEditor.getValue())
			},
			resize () {
				console.log(this.$refs.editorBox.clientWidth)
				let width = this.$refs.editorBox.clientWidth
				this.monacoEditor.getLayoutInfo().width = width
			},
			changeContent () {
				console.log('========')
				this.saveFile()
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.editor_wrap
		width 100%
		height 100%
		overflow hidden
		.editor
			width 100%
			height 100%
</style>
