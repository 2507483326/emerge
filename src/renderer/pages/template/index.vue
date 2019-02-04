<template>
	<div class="container">
		<!--头部-->
		<base-header></base-header>
		<!--main-->
		<div class="main_box">
			<!--左侧菜单-->
			<section ref="leftMenuBox" class="left_menu_box" @contextmenu.prevent.self.stop="showContextMenu">
				<div class="left_menu_inner">
					 <template-menu @showContextMenu="showContextMenu"
									@selectTemplate="selectTemplate"
									ref="templateMenu"
									:model="item"
									:key="item.id" v-for="item in templateList"></template-menu>
				</div>
			</section>
			<!--模板详细-->
			<section class="template_detail_box">
				<Form class="form_box" ref="form" :label-position="'left'" :label-width="90" :rules="validationRules" :model="templateData">
					<FormItem label="模板名称" prop="path">
						<input type="text" placeholder="请输入生成模板名称" v-model="templateData.name" />
					</FormItem>
					<FormItem label="模板名称" prop="language">
						<Select v-model="templateData.language" :datas="languageList" :nullOption="false" placeholder="选择语言" @change="changeLanguage"></Select>
					</FormItem>
				</Form>
				<div class="editor_box">
					<web-editor></web-editor>
				</div>
				<div class="button_box">
					<Button color="primary" @click="saveTemplate">保存</Button>
				</div>
			</section>
		</div>

		<!--右键菜单-->
		<context-menu ref="contextMenu"
					  @update:show="(show) => isRightMenuShow = show"
					  :show="isRightMenuShow" class="right_menu">
			<template v-if="menuSelectModel == null">
				<div @click="addTemplateFolder">新建模板文件夹</div>
			</template>
			<template v-else>
				<div @click="deleteTemplateFolder">删除模板文件夹</div>
				<div @click="createTemplate">新建模板</div>
			</template>
		</context-menu>
		<!--弹窗-->
		<section class="modal_box">
			<new-template-folder ref="newTemplateFolder"></new-template-folder>
			<new-template ref="newTemplate"></new-template>
		</section>
	</div>
</template>

<script>
	import baseHeader from '@/components/baseHeader'
	import templateMenu from '@/components/templateMenu'
	import contextMenu from '@/components/contextMenu'
	import newTemplateFolder from '@/components/newTemplateFolder'
	import newTemplate from '@/components/newTemplate'
	import webEditor from '@/components/webEditor'
	import { mapState } from 'vuex'
	export default {
		data () {
			return {
				isRightMenuShow: false,
				menuSelectModel: null,
				templateDetail: null,
				languageList: ['javascript'],
				templateData: {
					name: null,
					language: 'javascript'
				},
				validationRules: {
					rules: {
						name: {
							maxLen: 20,
							minLen: 1
						}
					},
					required: ['name']
				}
			}
		},
		computed: {
			...mapState({
				templateList: state => state.template.templateList
			})
		},
		methods: {
			showContextMenu ($event, model) {
				this.menuSelectModel = model
				this.$refs.contextMenu.contextMenuHandler($event)
				this.isRightMenuShow = true
			},
			addTemplateFolder () {
				this.$refs.newTemplateFolder.show()
				this.isRightMenuShow = false
			},
			deleteTemplateFolder () {
				this.$Confirm("删除模板文件夹和下面所有的模板文件", "确定删除？").then(async () => {
					try {
						await this.$store.dispatch('deleteTemplateFolder', this.menuSelectModel.id)
						this.$Message['success']('删除成功!')
					} catch (e) {
						this.$Message['error']('删除失败')
					}
				})
			},
			createTemplate () {
				this.$refs.newTemplate.show(this.menuSelectModel)
				this.isRightMenuShow = false
			},
			selectTemplate (data) {
				this.templateDetail = this.$store.getters.templateDetail(data)
			},
			saveTemplate () {},
			changeLanguage () {}
		},
		components: {
			baseHeader,
			templateMenu,
			contextMenu,
			newTemplateFolder,
			newTemplate,
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
		overflow hidden
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
		.button_box
			padding 10px
			box-sizing border-box
			overflow hidden
			button
				float right
</style>
