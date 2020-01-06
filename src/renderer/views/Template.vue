<template>
	<div class="template_box">
		<left-menu @addTemplateFile="addTemplateFile"></left-menu>
		<div class="main_box">
			<div class="tab_panel_box">
				<tags-nav></tags-nav>
			</div>
			<div class="main_wrapper">
				<router-view></router-view>
			</div>
		</div>
		<new-template-folder-modal ref="newTemplateFolderModal"></new-template-folder-modal>
		<new-template-file-modal ref="newTemplateFileModal"></new-template-file-modal>
		<div class="right_action_box">
			<Tooltip content="新建模板文件" placement="left">
				<div class="button_box" @click="showNewTemplateFile">
					<span class="iconfont icon-wenjian"></span>
				</div>
			</Tooltip>
			<Tooltip content="新建模板组" placement="left">
				<div class="button_box" @click="showNewTemplateFolder">
					<span class="iconfont icon-zujian-"></span>
				</div>
			</Tooltip>
		</div>
	</div>
</template>

<script>
	import LeftMenu from '@/components/template/LeftMenu'
	import NewTemplateFolderModal from '@/components/template/NewTemplateFolderModal'
	import NewTemplateFileModal from '@/components/template/NewTemplateFileModal'
	import TagsNav from '@/components/template/TagsNav'
	import clone from 'clone'
	export default {
		data () {
			return {
				activeTab: '',
				tabList: [
					{
						key: '首页',
						name: '模板一'
					}
				]
			}
		},
		computed: {
			templateFolderList () {
				return this.$store.state.template.templateFolderList
			},
			templateList () {
				return clone(this.$store.state.template.templateList)
			}
		},
		components: {
			LeftMenu,
			NewTemplateFolderModal,
			NewTemplateFileModal,
			TagsNav
		},
		mounted () {
			this.disableDefaultDrag()
		},
		beforeDestroy () {
			this.ableDefaultDrag()
		},
		methods: {
			showNewTemplateFolder () {
				this.$refs.newTemplateFolderModal.show()
			},
			showNewTemplateFile () {
				this.$refs.newTemplateFileModal.show()
			},
			addTemplateFile (templateFolderModel) {
				this.$refs.newTemplateFileModal.show(templateFolderModel.id)
			},
			customPrevent (event) {
				event.preventDefault()
			},
			disableDefaultDrag () {
				document.addEventListener('dragover', this.customPrevent, false)
				document.addEventListener('dragend', this.customPrevent, false)
				document.addEventListener('dragstart', this.customPrevent, false)
				document.addEventListener('drag', this.customPrevent, false)
				document.addEventListener('dragenter', this.customPrevent, false)
				document.addEventListener('dragleave', this.customPrevent, false)
			},
			ableDefaultDrag () {
				document.removeEventListener('dragover', this.customPrevent, false)
				document.removeEventListener('dragend', this.customPrevent, false)
				document.removeEventListener('dragstart', this.customPrevent, false)
				document.removeEventListener('drag', this.customPrevent, false)
				document.removeEventListener('dragenter', this.customPrevent, false)
				document.removeEventListener('dragleave', this.customPrevent, false)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.template_box
		height 100%
		width 100%
		position relative
		transform translate(0, 0)
		display flex
		.main_box
			flex 1
			height 100%
			display flex
			flex-direction column
			.main_wrapper
				flex 1
				overflow hidden
		.right_action_box
			position fixed
			right 10px
			bottom 10px
			width 40px
			.ivu-tooltip
				margin-top 10px
				&:first-child
					margin-top 0
			.button_box
				font-size 14px
				color #fff
				width 40px
				height 40px
				display flex
				align-items center
				justify-content center
				background #2d8cf0
				border-radius 50%
				cursor pointer
</style>
