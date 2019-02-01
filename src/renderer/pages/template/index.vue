<template>
	<div class="container">
		<!--头部-->
		<base-header></base-header>
		<!--main-->
		<div class="main_box">
			<!--左侧菜单-->
			<section ref="leftMenuBox" class="left_menu_box" @contextmenu.prevent.self.stop="showContextMenu">
				<div class="left_menu_inner">
					 <template-menu @showContextMenu="showContextMenu" ref="templateMenu" :model="item" :key="item.id" v-for="item in templateList"></template-menu>
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
				<div @click="deleteTemplate">删除模板文件夹</div>
			</template>
		</context-menu>
		<!--弹窗-->
		<section class="modal_box">
			<new-template-folder ref="newTemplateFolder"></new-template-folder>
		</section>
	</div>
</template>

<script>
	import baseHeader from '@/components/baseHeader'
	import templateMenu from '@/components/templateMenu'
	import contextMenu from '@/components/contextMenu'
	import newTemplateFolder from '@/components/newTemplateFolder'
	import { mapState } from 'vuex'
	export default {
		data () {
			return {
				isRightMenuShow: false,
				menuSelectModel: null
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
			deleteTemplate () {
				this.$Confirm("删除模板文件夹和下面所有的模板文件", "确定删除？").then(async () => {
					try {
						await this.$store.dispatch('deleteTemplate', this.menuSelectModel.id)
						this.$Message['success']('删除成功!')
					} catch (e) {
						this.$Message['error']('删除失败')
					}
				})
			}
		},
		components: {
			baseHeader,
			templateMenu,
			contextMenu,
			newTemplateFolder
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
</style>
