<template>
	<div class="template_detail_box">
		<div class="header">
			<Form ref="form" :model="templateObj" :label-width="80" v-if="templateObj">
				<FormItem label="输出路径">
					<Input prop="outPath" v-model="templateObj.outPath" placeholder="请输入输出路径"></Input>
				</FormItem>
				<FormItem prop="language" label="语言">
					<Select v-model="templateObj.language" style="width:200px">
						<Option value="html">html</Option>
						<Option value="css">css</Option>
						<Option value="javascript">javascript</Option>
						<Option value="java">java</Option>
						<Option value="json">json</Option>
					</Select>
				</FormItem>
			</Form>
		</div>
		<div class="editor_box">
			<div class="content-box">
				<div class="content" ref="editor"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import clone from 'clone'
	import monaco from '@/util/MonacoEditorUtil'
	export default {
		data () {
			return {
				templateObj: null,
				monacoEditor: null
			}
		},
		watch: {
			'$route' (to, from) {
				this.initTemplate()
				this.initEditor()
			},
			templateObj: {
				deep: true,
				handler: function (newVal) {
					console.log('newVal', newVal)
					if (newVal) {
						this.$store.dispatch('updateTemplate', this.templateObj)
					}
				}
			}
		},
		computed: {
			templateList () {
				return clone(this.$store.state.template.templateList)
			}
		},
		mounted () {
			this.initTemplate()
			this.initEditor()
			window.addEventListener('resize', this.resizeEditor)
		},
		destroyed () {
			if (this.monacoEditor) {
				this.monacoEditor.dispose()
			}
			window.removeEventListener('resize', this.resizeEditor)
		},
		methods: {
			resizeEditor () {
				if (this.monacoEditor) {
					this.monacoEditor.dispose()
				}
				this.initEditor()
			},
			initTemplate () {
				const templateId = this.$route.params.templateId
				const index = this.templateList.findIndex(item => {
					return item.id === templateId
				})
				this.templateObj = this.templateList[index]
			},
			initEditor () {
				if (this.monacoEditor) {
					this.monacoEditor.dispose()
				}
				console.log(this.templateObj)
				this.$nextTick(() => {
					if (this.templateObj && this.$refs.editor) {
						this.monacoEditor = monaco.editor.create(this.$refs.editor, {
							value: this.templateObj.content,
							language: 'javascript'
						})
						this.monacoEditor.onDidChangeModelContent(this.changeContent)
					}
				})
			},
			changeContent () {
				console.log('change')
				this.templateObj.content = this.monacoEditor.getValue()
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.template_detail_box
		height 100%
		display flex
		flex-direction column
		width calc(100% - 1px)
		.editor_box
			flex 1
			.content-box
				height 100%
				.content
					height 100%
		/deep/.ivu-form
			display flex
			justify-content space-between
			padding 10px
			.ivu-form-item
				margin 0
</style>
