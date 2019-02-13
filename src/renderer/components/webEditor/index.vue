<template>
	<div class="editor_wrap">
		<div ref="editorBox" class="inner_box" >
			<div ref="editor" class="editor"></div>
		</div>
	</div>
</template>

<script>
	import * as monaco from 'monaco-editor'
	import '@/assets/lib/monaco'
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
		watch: {
			'model.language': {
				handler: function (newVal, oldVal) {
					if (newVal) {
						console.log('=============')
						console.log(newVal)
						this.changeLanguage(newVal)
					}
				},
				deep: true
			}
		},
		mounted () {
			if (this.model) {
				this.renderEditor()
			}
			window.addEventListener('resize', this.resizeEditor)
		},
		destroyed () {
			if (this.monacoEditor) {
				this.monacoEditor.dispose()
			}
			window.removeEventListener('resize', this.resizeEditor)
		},
		methods: {
			renderEditor () {
				if (this.monacoEditor) {
					this.monacoEditor.dispose()
				}
				console.log(this.model)
				this.initEditor()
				let content = this.readFile()
				this.monacoEditor.setValue(content)
			},
			initEditor () {
				console.log(this.model.language)
				this.monacoEditor = monaco.editor.create(this.$refs.editor, {
					language: this.model.language
				})
				console.log(this.monacoEditor)
				this.monacoEditor.onDidChangeModelContent(this.changeContent)
			},
			readFile () {
				try {
					fs.ensureFileSync(this.model.path)
					let result = fs.readFileSync(this.model.path) + ""
					return result
				} catch (e) {
					console.error(e)
					this.$Message['error']('获取文件失败!')
					return null
				}
			},
			async saveFile () {
				this.$emit('changeState', 1)
				console.log(this.monacoEditor.getValue())
				fs.writeFileSync(this.model.path, this.monacoEditor.getValue())
				this.$emit('changeState', 2)
			},
			resizeEditor () {
				if (this.monacoEditor) {
					this.monacoEditor.layout()
				}
			},
			changeContent () {
				console.log('========')
				this.saveFile()
			},
			changeLanguage () {
				this.$nextTick(() => {
					this.renderEditor()
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.editor_wrap
		position relative
		width 100%
		height 100%
		.inner_box
			position absolute
			top 0
			left 0
			bottom 0
			right 0
			.editor
				width 100%
				height 100%
</style>
