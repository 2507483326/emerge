<template>
	<div class="container">
		<!--头部-->
		<base-header></base-header>
		<!--main-->
		<div class="main_box">
			<!--左侧菜单-->
			<section ref="leftMenuBox" class="left_menu_box" @contextmenu.prevent.self.stop="showContextMenu">
				<div class="left_menu_inner">
					<template-menu
						ref="templateMenu"
						:model="item"
						:key="item.id" v-for="item in templateList"></template-menu>
				</div>
			</section>
			<!--模板详细-->
			<section class="template_detail_box" v-show="templateDetail">
				<Form class="form_box" ref="form" :label-position="'left'" :label-width="90" :rules="validationRules"
					  :model="templateData">
					<Row>
						<Col width="12">
							<FormItem label="模板名称" prop="generateName">
								<input type="text" placeholder="请输入生成模板名称" v-model="templateData.generateName"/>
							</FormItem>
						</Col>
						<Col width="12">
							<FormItem label="模板语言" prop="language">
								<Select v-model="templateData.language" :datas="languageList" :nullOption="false"
										placeholder="选择语言" @change="changeLanguage"></Select>
							</FormItem>
						</Col>
					</Row>
				</Form>
				<div class="editor_box">
					<web-editor ref="editor" :model="templateDetail"
								@changeState="(state) => editorState = state"></web-editor>
				</div>
				<div class="tip_box">
					<div v-show="editorState === 1">保存中...</div>
					<div v-show="editorState === 2">已保存</div>
				</div>
			</section>
			<section class="template_detail_box" v-show="!templateDetail"></section>
		</div>

		<!--右键菜单-->
		<context-menu ref="contextMenu"
					  @update:show="(show) => isRightMenuShow = show"
					  :show="isRightMenuShow" class="right_menu">
			<template v-if="menuSelectModel == null">
				<div @click="addTemplateFolder">新建模板文件夹</div>
			</template>
			<template v-else-if="menuSelectModel.isFolder == true">
				<div @click="deleteTemplateFolder">删除模板文件夹</div>
				<div @click="createTemplate">新建模板</div>
			</template>
			<template v-else-if="menuSelectModel.isFolder == false">
				<div @click="deleteTemplate">删除模板</div>
			</template>
		</context-menu>
		<!--弹窗-->
		<section class="modal_box">
			<new-template-folder ref="newTemplateFolder"></new-template-folder>
			<new-template ref="newTemplate"></new-template>
			<new-exists-template ref="newExistsTemplate"></new-exists-template>
		</section>
	</div>
</template>

<script>
	import baseHeader from '@/components/baseHeader'
	import templateMenu from '@/components/templateMenu'
	import contextMenu from '@/components/contextMenu'
	import newTemplateFolder from '@/components/newTemplateFolder'
	import newTemplate from '@/components/newTemplate'
	import newExistsTemplate from '@/components/newExistsTemplate'
	import webEditor from '@/components/webEditor'
	import {mapState} from 'vuex'
	import { $const } from '@/common'
	export default {
		data () {
			return {
				isRightMenuShow: false,
				menuSelectModel: null,
				templateDetail: null,
				languageList: $const['TEMPLATE/LANGUAGE'],
				templateData: {
					generateName: null,
					language: 'artHtml'
				},
				validationRules: {
					rules: {
						generateName: {
							maxLen: 100,
							minLen: 1
						}
					},
					required: ['generateName', 'language']
				},
				editorState: $const['TEMPLATE/EDITOR_STATE'].default
			}
		},
		watch: {
			editorState (newVal) {
				if (newVal === $const['TEMPLATE/EDITOR_STATE'].complete) {
					clearTimeout(this.stateTimeout)
					this.stateTimeout = setTimeout(() => {
						this.editorState = $const['TEMPLATE/EDITOR_STATE'].default
					}, 500)
				}
			},
			'templateData.generateName': {
				handler: function (newVal) {
					this.changeGenerateName(newVal)
				},
				deep: true
			}
		},
		computed: {
			...mapState({
				templateList: state => state.template.templateList
			})
		},
		created () {
			document.addEventListener('drop', this.addExistsFile)
			this.$bus.on('selectTemplate', this.selectTemplate)
			this.$bus.on('showTemplateContextMenu', this.showContextMenu)
		},
		beforeDestroy () {
			document.removeEventListener('drop', this.addExistsFile)
			this.$bus.off('selectTemplate', this.selectTemplate)
			this.$bus.off('showTemplateContextMenu', this.showContextMenu)
		},
		methods: {
			showContextMenu ($event, model) {
				this.menuSelectModel = model
				this.$refs.contextMenu.contextMenuHandler($event)
				this.isRightMenuShow = true
			},
			addTemplateFolder () {
				this.isRightMenuShow = false
				this.$refs.newTemplateFolder.show()
			},
			deleteTemplateFolder () {
				this.isRightMenuShow = false
				this.$Confirm("删除模板文件夹和模板文件", "确定删除？").then(async () => {
					try {
						await this.$store.dispatch('deleteTemplateFolder', this.menuSelectModel.id)
						this.$Message['success']('删除成功!')
					} catch (e) {
						console.error(e)
						this.$Message['error']('删除失败!')
					}
				})
			},
			createTemplate () {
				this.isRightMenuShow = false
				this.$refs.newTemplate.show(this.menuSelectModel)
			},
			async deleteTemplate () {
				this.editorState = $const['TEMPLATE/EDITOR_STATE'].save
				this.isRightMenuShow = false
				try {
					await this.$store.dispatch('deleteTemplate', this.menuSelectModel.id)
					this.$Message['success']('删除成功!')
				} catch (e) {
					console.error(e)
					this.$Message['error']('删除失败!')
				}
				this.editorState = $const['TEMPLATE/EDITOR_STATE'].complete
			},
			selectTemplate (data) {
				this.templateDetail = this.$store.getters.templateDetail(data)
				this.$nextTick(() => {
					this.templateData.language = this.templateDetail.language
					this.templateData.generateName = this.templateDetail.generateName
					this.$refs.editor.renderEditor()
				})
			},
			async changeGenerateName (name) {
				this.editorState = $const['TEMPLATE/EDITOR_STATE'].save
				try {
					await this.$store.dispatch('changeTemplate', {
						id: this.templateDetail.id,
						folderId: this.templateDetail.folderId,
						key: 'generateName',
						value: name
					})
				} catch (e) {
					console.error(e)
					this.$Message['error']('修改模板名称失败!')
				}
				this.editorState = $const['TEMPLATE/EDITOR_STATE'].complete
			},
			async changeLanguage (e) {
				this.editorState = $const['TEMPLATE/EDITOR_STATE'].save
				try {
					await this.$store.dispatch('changeTemplate', {
						id: this.templateDetail.id,
						folderId: this.templateDetail.folderId,
						key: 'language',
						value: e.key
					})
				} catch (e) {
					console.error(e)
					this.$Message['error']('修改模板语言失败!')
				}
				this.editorState = $const['TEMPLATE/EDITOR_STATE'].complete
			},
			addExistsFile (event) {
				event.preventDefault()
				event.stopPropagation()
				let file = event.dataTransfer.files[0]
				if (file == null) {
					this.$Message['warn']('请选择文件!')
					return
				}
				if (!this.templateList || this.templateList.length === 0) {
					this.$Message['warn']('请先新建模板文件夹!')
					return
				}
				this.$refs.newExistsTemplate.show(file)
			}
		},
		components: {
			baseHeader,
			templateMenu,
			contextMenu,
			newTemplateFolder,
			newTemplate,
			newExistsTemplate,
			webEditor
		}
	}
</script>

<style lang="stylus" scoped>
	@import "../../assets/stylus/leftMenu.stylus"
	.main_box
		display flex
		margin-top 10px
		flex 1

	.right_menu
		position fixed
		background #fff
		border solid 1px rgba(0, 0, 0, .2)
		border-radius 3px
		z-index 999
		display none

	.template_detail_box
		flex 1
		height 100%
		display flex
		height 100%
		flex-direction column
		padding 10px
		box-sizing border-box
		background #fff
		margin-left 10px
		.form_box
			margin-bottom 10px
		.editor_box
			width 100%
			flex 1
		.tip_box
			height 20px
			font-size 12px
			box-sizing border-box
			display flex
			align-items center
			padding-left 5px
</style>
