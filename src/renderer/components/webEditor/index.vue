<template>
	<div ref="editor" id="container"></div>
</template>

<script>
	import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
	import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
	import * as monaco from 'monaco-editor/esm/vs/editor/edcore.main'
	import '@/assets/lib/monaco/language'

	export default {
		mounted () {
			// eslint-disable-next-line
			self.MonacoEnvironment = {
				getWorkerUrl: function (moduleId, label) {
					if (label === 'json') {
						return './json.worker.js'
					}
					if (label === 'css') {
						return './css.worker.js'
					}
					if (label === 'html') {
						return './html.worker.js'
					}
					if (label === 'typescript' || label === 'javascript') {
						return './ts.worker.js'
					}
					return './editor.worker.js'
				}
			}
			// eslint-disable-next-line
			monaco.editor.create(this.$refs.editor, {
				value: [
					'function x() {',
					'\tconsole.log("Hello world!");',
					'}'
				].join('\n'),
				language: 'javascript'
			})
		}
	}
</script>

<style lang="stylus" scoped>
	#container
		width 100%
		height 100%
		background #fff
</style>
