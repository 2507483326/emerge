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

	export default {
		data () {
			return {
				monacoEditor: null
			}
		},
		mounted () {
			// eslint-disable-next-line
			this.monacoEditor = monaco.editor.create(this.$refs.editor, {
				value: [
					'function x() {',
					'\tconsole.log("Hello world!");',
					'}'
				].join('\n'),
				language: 'javascript'
			})
			// this.$refs.editorBox.onresize = this.resize()
		},
		methods: {
			resize () {
				console.log(this.$refs.editorBox.clientWidth)
				let width = this.$refs.editorBox.clientWidth
				this.monacoEditor.getLayoutInfo().width = width
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
