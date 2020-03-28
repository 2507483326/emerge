<template>
	<div class="custom_tag_nav_box">
		<div class="tag_scroll_background">
			<div class="tag_scroll_box" ref="scrollOuter"  @DOMMouseScroll="handleDomScroll" @mousewheel="handleDomScroll">
				<div ref="scrollBody" class="tag_scroll_inner" :style="{left: tagBodyLeft + 'px'}">
					<transition-group name="tag_list_moving_animation">
						<div class="tag_box" draggable="true" @dragstart="dragCustomTag($event, item)" :key="item.key" v-for="item in customTagList">
							<Tag type="dot"  :color="item.color" closable @on-close="deleteTag(item.id)">{{ item.name }}</Tag>
						</div>
					</transition-group>
				</div>
			</div>
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
		</div>

		<Dropdown style="margin-right: 20px" @on-click="selectMenu">
			<Button class="add_new_tag_button" type="primary">
				<Icon type="ios-keypad"></Icon>
			</Button>
			<Dropdown-menu slot="list">
				<Dropdown-item name="add">创建标签</Dropdown-item>
				<Dropdown-item name="export">导出标签</Dropdown-item>
				<Dropdown-item name="import">导入标签</Dropdown-item>
			</Dropdown-menu>
		</Dropdown>
		<new-custom-tag-modal ref="newCustomTagModal"></new-custom-tag-modal>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import NewCustomTagModal from './NewCustomTagModal'
	import fs from "fs-extra"
	const { dialog } = require('electron').remote
	import path from 'path'
	export default {
		data () {
			return {
				tagBodyLeft: 0
			}
		},
		components: {
			NewCustomTagModal
		},
		computed: {
			...mapState({
				customTagList: state => state.tag.customTagList
			})
		},
		methods: {
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
						if (!(this.tagBodyLeft < -(bodyWidth - outerWidth))) {
							this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
						}
						return
					}
					this.tagBodyLeft = 0
				}
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
			addCustomTag () {
				this.$refs.newCustomTagModal.show()
			},
			async deleteTag (tagId) {
				try {
					await this.$store.dispatch('removeCustomTag', tagId)
				} catch (e) {
					console.error(e)
					this.$Message.error('删除自定义标签失败!')
				}
			},
			dragCustomTag (event, tag) {
				console.log(tag)
				event.dataTransfer.setData("customTag", JSON.stringify(tag));
			},
			selectMenu (key) {
				if (key === 'add') {
					this.addCustomTag()
					return
				}
				if (key === 'export') {
					this.exportTag()
					return
				}
				if (key === 'import') {
					this.importTag()
					return
				}
			},
			exportTag () {
				this.isContextMenuShow = false
				dialog.showSaveDialog({
					title: '选择标签导出',
					defaultPath: path.normalize('./default.et'),
					filters: [
						{ name: 'et', extensions: ['et'] }
					]
				}, (filePaths) => {
					try {
						if (filePaths) {
							fs.writeFileSync(path.normalize(filePaths), JSON.stringify(this.customTagList))
							this.$Message.success('导出标签成功!')
						}
					} catch (e) {
						console.error(e)
						this.$Message.error('导出标签失败!')
					}
				})
			},
			importTag () {
				dialog.showOpenDialog({
					title: '选择标签导入',
					properties: ['openFile'],
					defaultPath: path.normalize('./default.et'),
					filters: [
						{ name: 'et', extensions: ['et'] }
					]
				}, (filePaths) => {
					try {
						if (filePaths) {
							const tagList = fs.readJsonSync(path.normalize(filePaths[0]))
							for (let i = 0; i < tagList.length; i++) {
								this.$store.dispatch('addNewCustomTag', tagList[i])
							}
							this.$Message.success('导入标签成功')
						}
					} catch (e) {
						console.error(e)
						this.$Message.error('导入数据库失败')
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.custom_tag_nav_box
		height 60px
		padding 10px 20px
		width 100%
		display flex
		align-items center
		.tag_scroll_background
			flex 1
			position relative
			background #f0f0f0
			height 100%
			.scroll_button
				position absolute
				top 0
				height 40px
				background #fff
				z-index 10
				button
					padding 6px 4px
					height 100%
					line-height 14px
					text-align center
					outline none
					border none
					&:focus
						outline none
						border none
						box-shadow none
				&.left_button
					left 0
				&.right_button
					right 0
			.tag_scroll_box
				position relative
				margin 0 40px
				overflow hidden
				height 100%
				.tag_scroll_inner
					position absolute
					left 0
					top 0
					display flex
					height 100%
					align-items center
					flex-wrap nowrap
					white-space nowrap
					.tag_box
						display inline-block
		.add_new_tag_button
			font-size 15px
			border-radius 0
			margin-left 5px
</style>
