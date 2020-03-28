<template>
	<div class="tags_nav_box">
		<!-- 右键菜单 -->
		<ul v-show="menuShow" :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}"
			class="context_menu_box">
			<li v-for="(item, key) of menuList" @click="handleTagsOption(key)" :key="key">{{item}}</li>
		</ul>
		<!--左右滚动按钮-->
		<div class="scroll_button left_button">
			<Button type="text" @click="handleScroll(240)">
				<Icon :size="18" type="ios-arrow-back"/>
			</Button>
		</div>
		<div class="scroll_button right_button">
			<Button type="text" @click="handleScroll(-240)">
				<Icon :size="18" type="ios-arrow-forward"/>
			</Button>
		</div>
		<!--标签容器-->
		<div class="tag_scroll_box" ref="scrollOuter" @DOMMouseScroll="handleDomScroll" @mousewheel="handleDomScroll">
			<div ref="scrollBody" class="tag_scroll_inner" :style="{left: tagBodyLeft + 'px'}">
				<transition-group name="taglist-moving-animation">
					<Tag
						key="-1"
						type="dot"
						ref="tagsPageOpened"
						name="主页"
						@click.native="handleClick(null)"
						:color="isCurrentTag(null) ? 'primary' : 'default'"
						@contextmenu.prevent.native="showContextMenu(null, $event)"
					>主页</Tag>
					<Tag
						type="dot"
						v-for="(item, index) in tagList"
						ref="tagsPageOpened"
						:key="`tag-nav-${index}`"
						:name="item.name"
						:data-route-item="item"
						@on-close="handleClose(item)"
						@click.native="handleClick(item)"
						closable
						:color="isCurrentTag(item) ? 'primary' : 'default'"
						@contextmenu.prevent.native="showContextMenu(item, $event)"
					>{{ item.name }}
					</Tag>
				</transition-group>
			</div>
		</div>
	</div>
</template>

<script>
	import clone from 'clone'
	export default {
		name: 'TagsNav',
		watch: {
			menuShow(value) {
				if (value) {
					document.body.addEventListener('click', this.closeContextMenu)
				} else {
					document.body.removeEventListener('click', this.closeContextMenu)
				}
			},
			'$route' (to, from) {
				this.changeRouterHandler()
			}
		},
		computed: {
			templateFolderList () {
				return this.$store.state.template.templateFolderList
			},
			templateList () {
				return clone(this.$store.state.template.templateList)
			},
			menuList () {
				if (this.selectTagNav == null) {
					return {
						others: '关闭其他'
					}
				} else {
					return {
						others: '关闭其他',
						all: '关闭所有'
					}
				}
			}
		},
		data() {
			return {
				tagBodyLeft: 0,
				rightOffset: 40,
				outerPadding: 4,
				contextMenuLeft: 0,
				contextMenuTop: 0,
				menuShow: false,
				tagList: [],
				activeTag: null,
				selectTagNav: null
			}
		},
		mounted () {
			this.changeRouterHandler()
		},
		methods: {
			changeRouterHandler () {
				console.log(this.$route)
				const folderId = this.$route.params.folderId
				const templateId = this.$route.params.templateId
				const templateFolderIndex = this.templateFolderList.findIndex(item => {
					return item.id === folderId
				})
				const templateFolder = this.templateFolderList[templateFolderIndex]
				const templateIndex = this.templateList.findIndex(item => {
					return item.id === templateId
				})
				const template = this.templateList[templateIndex]
				if (templateFolder && template) {
					this.addNewTag(templateFolder, template)
				}
			},
			/**
			 * 和当前路由判断
			 * @param item
			 * @returns {*|boolean|*}
			 */
			isCurrentTag(item) {
				if (item == null) {
					return this.activeTag == null || this.tagList == null || this.tagList.length === 0
				}
				return this.activeTag === item.key
			},
			/**
			 * 展示右键菜单
			 * @param item
			 * @param e
			 */
			showContextMenu(item, e) {
				this.menuShow = true
				const offsetLeft = this.$el.getBoundingClientRect().left
				this.contextMenuLeft = e.clientX - offsetLeft
				this.contextMenuTop = e.clientY
				this.selectTagNav = item
			},
			closeContextMenu() {
				this.menuShow = false
			},
			/**
			 * 监听dom标签容器左右滚动
			 * @param offset
			 */
			handleDomScroll(e) {
				let type = e.type
				let delta = 0
				if (type === 'DOMMouseScroll' || type === 'mousewheel') {
					delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
				}
				this.handleScroll(delta)
			},
			/**
			 * 标签容器左右滚动
			 * @param offset
			 */
			handleScroll(offset) {
				const outerWidth = this.$refs.scrollOuter.offsetWidth
				const bodyWidth = this.$refs.scrollBody.offsetWidth
				if (offset > 0) {
					this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
				} else {
					if (outerWidth < bodyWidth) {
						if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
							this.tagBodyLeft = this.tagBodyLeft
						} else {
							this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
						}
					} else {
						this.tagBodyLeft = 0
					}
				}
			},
			/**
			 * 关闭选中标签
			 * @param item
			 */
			handleClose(item) {
				const name = item.key
				const index = this.tagList.findIndex(item => {
					return item.key === name
				})
				this.tagList = this.tagList.filter(item => {
					return item.key !== name
				})
				let lastIndex = -1
				const maxListLength = this.tagList.length - 1
				if (index <= maxListLength && maxListLength >= 0) {
					lastIndex = index
				} else if (index > maxListLength  && maxListLength >= 0) {
					lastIndex = this.tagList.length - 1
				}
				if (lastIndex >= 0) {
					this.handleClick(this.tagList[lastIndex])
				} else {
					this.$router.push({
						path: '/template'
					})
				}
			},
			/**
			 * 跳转选中标签
			 * @param item
			 */
			handleClick(item) {
				if (item == null) {
					this.activeTag = null
					this.$router.push({
						path: '/template'
					})
					return
				}
				console.log(item)
				const name = item.key
				const folderId = name.split('|')[0]
				const templateId = name.split('|')[1]
				this.$router.push({
					path: '/template/detail/' + folderId + '/' + templateId
				})
				this.activeTag = folderId + '|' + templateId
			},
			/**
			 * 右键菜单选中
			 * @param type
			 */
			handleTagsOption(type) {
				if (type.includes('all')) {
					this.tagList = []
					this.$router.push({
						path: '/template'
					})
				} else if (type.includes('others')) {
					this.tagList = this.tagList.filter(item => {
						return item.key === this.selectTagNav.key
					})
					this.handleClick(this.selectTagNav)
				}
			},
			addNewTag (templateFolder, template) {
				console.log(this)
				const index = this.tagList.findIndex(item => {
					return item.folderId === templateFolder.id && item.templateId === template.id
				})
				if (index < 0) {
					if (this.tagList.length > 5) {
						this.tagList.shift()
					}
					this.tagList.push({
						key: templateFolder.id + '|' + template.id,
						name: template.name,
						folderId: templateFolder.id,
						templateId: template.id
					})
				}
				this.activeTag = templateFolder.id + '|' + template.id
			}
		}
	}
</script>

<style>
	.no-select {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.size {
		width: 100%;
		height: 100%;
	}

	.tags_nav_box {
		position: relative;
		border-top: 1px solid #F0F0F0;
		border-bottom: 1px solid #F0F0F0;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		width: 100%;
		height: 40px;
	}

	.tags_nav_box .close-con {
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 32px;
		background: #fff;
		text-align: center;
		z-index: 10;
	}

	.tags_nav_box .scroll_button {
		position: absolute;
		top: 0px;
		height: 100%;
		background: #fff;
		padding-top: 3px;
		z-index: 10;
	}

	.tags_nav_box .scroll_button button {
		padding: 6px 4px;
		line-height: 14px;
		text-align: center;
	}

	.tags_nav_box .scroll_button.left_button {
		left: 0px;
	}

	.tags_nav_box .scroll_button.right_button {
		right: 0px;
		border-right: 1px solid #F0F0F0;
	}

	.tags_nav_box .tag_scroll_box {
		position: absolute;
		left: 28px;
		right: 29px;
		top: 0;
		bottom: 0;
		overflow: hidden;
		box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
	}

	.tags_nav_box .tag_scroll_box .tag_scroll_inner {
		height: calc(100% - 1px);
		display: inline-block;
		padding: 1px 4px 0;
		position: absolute;
		overflow: visible;
		white-space: nowrap;
		transition: left .3s ease;
	}

	.tags_nav_box .tag_scroll_box .tag_scroll_inner .ivu-tag-dot-inner {
		transition: background .2s ease;
	}

	.tags_nav_box .context_menu_box {
		position: absolute;
		margin: 0;
		padding: 5px 0;
		background: #fff;
		z-index: 1000;
		list-style-type: none;
		border-radius: 4px;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
	}

	.tags_nav_box .context_menu_box li {
		margin: 0;
		padding: 5px 15px;
		cursor: pointer;
	}

	.tags_nav_box .context_menu_box li:hover {
		background: #eee;
	}

</style>
