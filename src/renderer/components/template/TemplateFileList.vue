<template>
	<div class="menu-box">
		<Menu ref="templateMenu" theme="dark" accordion @on-select="selectMenuItem" :active-name="activeName">
			<div class="search-box">
				<Input v-model="searchText" clearable placeholder="搜索..." style="width: auto">
				</Input>
				<Button slot="append" icon="ios-search"></Button>
			</div>
			<div @contextmenu="showContextMenu($event, item)" v-for="item in templateFolderList" :key="item.id">
				<Submenu :name="item.id">
					<div class="menu_box" slot="title">
						<span class="iconfont icon-zujian-"></span>
						<span class="name">{{ item.name }}</span>
					</div>
					<div @contextmenu.prevent.stop="showContextMenu($event, item, templateFileItem)" :key="index" v-for="(templateFileItem, index) in getTemplateFileList(item.id)">
						<MenuItem :name="item.id + '|' + templateFileItem.id">{{ templateFileItem.name }}</MenuItem>
					</div>
				</Submenu>
			</div>
		</Menu>
		<context-menu ref="contextMenu" :offset="{x: -35, y: 15}" class="left_menu" :show="isContextMenuShow" @update:show="(show) => isContextMenuShow = show">
			<template v-if="selectTemplate == null">
				<div @click="addTemplateFile">添加模板文件</div>
				<div @click="exportTemplateGroup">导出模板组</div>
				<div @click="importTemplateFile">导入模板文件</div>
				<div @click="deleteTemplateFolder">删除模板组</div>
			</template>
			<template v-else>
				<div @click="exportTemplate">导出模板</div>
				<div @click="deleteTemplate">删除模板</div>
			</template>
		</context-menu>
		<new-template-file-modal ref="newTemplateFileModal"></new-template-file-modal>
	</div>
</template>

<script>
	import ContextMenu from '@/components/common/ContextMenu'
	import clone from 'clone'
	const { dialog } = require('electron').remote
	import path from 'path'
	import fs from "fs-extra"
	import NewTemplateFileModal from '@/components/template/NewTemplateFileModal'
	export default {
		name: 'table-menu',
		data () {
			return {
				searchText: null,
				isContextMenuShow: false,
				selectTemplateFolder: null,
				selectTemplate: null,
				activeName: null
			}
		},
		components: {
			ContextMenu,
			NewTemplateFileModal
		},
		computed: {
			templateFolderList () {
				return this.$store.state.template.templateFolderList
			},
			templateList () {
				if (this.searchText == null || this.searchText == '' || this.$store.state.template.templateList == null) {
					return clone(this.$store.state.template.templateList)
				}
				let templateList = clone(this.$store.state.template.templateList)
				return templateList.filter(item => {
					return item.name.indexOf(this.searchText) >= 0
				})
			}
		},
		watch: {
			'$route' (to, from) {
				this.changeMenuSelect()
			},
		},
		mounted () {
			this.changeMenuSelect()
		},
		methods: {
			changeMenuSelect () {
				console.log(this.$route)
				const folderId = this.$route.params.folderId
				const templateId = this.$route.params.templateId
				console.log(folderId)
				if (folderId && templateId) {
					this.activeName = folderId + '|' + templateId
				} else {
					this.activeName = 'qwewqewq'
				}
				this.$nextTick(() => {
					console.log(this.activeName)
					this.$refs.templateMenu.updateActiveName()
					this.$refs.templateMenu.updateOpened()
				})
			},
			showContextMenu ($event, templateFolderModel, templateFileModel) {
				this.isContextMenuShow = true
				this.selectTemplateFolder = templateFolderModel
				this.selectTemplate = templateFileModel ? templateFileModel : null
				this.$refs.contextMenu.contextMenuHandler($event)
			},
			getTemplateFileList (folderId) {
				return this.templateList.filter(item => {
					return item.folderId === folderId
				})
			},
			selectTemplateFile (name) {
			},
			selectMenuItem (name) {
				const folderId = name.split('|')[0]
				const templateId = name.split('|')[1]
				const path = '/template/detail/' + folderId + '/' + templateId
				if (path === this.$route.path) {
					return
				}
				this.$router.push({
					path: '/template/detail/' + folderId + '/' + templateId
				})
			},
			addTemplateFile () {
				this.isContextMenuShow = false
				this.$emit('addTemplateFile', this.selectTemplateFolder)
			},
			importTemplateFile () {
				this.isContextMenuShow = false
				dialog.showOpenDialog({
					title: '选择模板导入',
					properties: ['openFile'],
					defaultPath: path.normalize('./default.art'),
					filters: [
						{ name: 'art', extensions: ['art'] }
					]
				}, (filePaths) => {
					try {
						if (filePaths) {
							const template = fs.readJsonSync(path.normalize(filePaths[0]))
							console.log(template.content)
							this.$refs.newTemplateFileModal.show(null, template.content)
						}
					} catch (e) {
						console.error(e)
						this.$Message.error('导入模板失败')
					}
				})
			},
			deleteTemplateFolder () {
				this.isContextMenuShow = false
				this.$Modal.confirm({
					title: '提示',
					content: '<p>确认删除此模板组?</p>',
					onOk: async () => {
						try {
							await this.$store.dispatch('removeTemplateFolder', this.selectTemplateFolder.id)
							this.$Message.success('删除模板组成功')
						} catch (err) {
							this.$Message.error('删除模板组失败!')
						}
					}
				})
			},
			deleteTemplate () {
				this.isContextMenuShow = false
				this.$Modal.confirm({
					title: '提示',
					content: '<p>确认删除此模板?</p>',
					onOk: async () => {
						try {
							await this.$store.dispatch('removeTemplate', this.selectTemplate.id)
							console.log(this.selectTemplate.id)
							this.$parent.$parent.$refs.tagsNav.tagList.forEach(item => {
								if (item.templateId === this.selectTemplate.id) {
									this.$parent.$parent.$refs.tagsNav.handleClose(item)
								}
							})
							this.$Message.success('删除模板成功')
						} catch (err) {
							this.$Message.error('删除模板失败!')
						}
					}
				})
			},
			exportTemplate () {
				this.isContextMenuShow = false
				dialog.showSaveDialog({
					title: '选择模板导出',
					defaultPath: path.normalize('./default.art'),
					filters: [
						{ name: 'art', extensions: ['art'] }
					]
				}, (filePaths) => {
					try {
						if (filePaths) {
							fs.writeFileSync(path.normalize(filePaths), JSON.stringify(this.selectTemplate))
							this.$Message.success('导出模板成功!')
						}
					} catch (e) {
						console.error(e)
						this.$Message.error('导出模板失败!')
					}
				})
			},
			exportTemplateGroup () {
				this.isContextMenuShow = false
				dialog.showSaveDialog({
					title: '选择模板组导出',
					defaultPath: path.normalize('./default.artGroup'),
					filters: [
						{ name: 'artGroup', extensions: ['artGroup'] }
					]
				}, (filePaths) => {
					try {
						if (filePaths) {
							fs.writeFileSync(path.normalize(filePaths), JSON.stringify({
								name: this.selectTemplateFolder.name,
								list: this.getTemplateFileList(this.selectTemplateFolder.id)
							}))
							this.$Message.success('导出模板组成功!')
						}
					} catch (e) {
						console.error(e)
						this.$Message.error('导出模板组失败!')
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.menu-box
		height 100vh
		width 240px
		background #515a6e
		position relative
		.search-box
			padding 10px
			display flex
			>>> input
				border-bottom-right-radius 0px
				border-top-right-radius 0px
			>>> button
				border-top-left-radius 0px
				border-bottom-left-radius 0px
		.menu_box
			height 25px
			line-height 25px
			.name
				vertical-align top
				padding-left 5px
		.left_menu
			position fixed
			background #fff
			border solid 1px rgba(0, 0, 0, .2)
			border-radius 3px
			z-index 999
			display none
			user-select none
			cursor pointer
			div
				width 100px
				height 20px
				line-height 20px
				font-size 14px
		.load_db_icon
			animation ani-demo-spin 1s linear infinite
		@keyframes ani-demo-spin
			from
				transform rotate(0deg)
			50%
				transform: rotate(180deg)
			to
				transform: rotate(360deg)
</style>
