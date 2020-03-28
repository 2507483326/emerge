<template>
	<div class="context_menu_box" :style="style" style="display: block;" v-show="show"
		 @mousedown.stop
		 @contextmenu.prevent
	>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'context-menu',
		data () {
			return {
				triggerHideFn: () => {},
				x: null,
				y: null,
				style: {}
			}
		},
		props: {
			show: Boolean,
			offset: {
				type: Object,
				default: () => {
					return {
						x: 0,
						y: 0
					}
				}
			}
		},
		watch: {
			show (show) {
				if (show) {
					this.bindHideEvents()
				} else {
					this.unbindHideEvents()
				}
			}
		},
		methods: {
			// 绑定隐藏菜单事件
			bindHideEvents () {
				this.triggerHideFn = this.clickDocumentHandler.bind(this)
				document.addEventListener('mousedown', this.triggerHideFn)
				document.addEventListener('mousewheel', this.triggerHideFn)
			},

			// 取消绑定隐藏菜单事件
			unbindHideEvents () {
				document.removeEventListener('mousedown', this.triggerHideFn)
				document.removeEventListener('mousewheel', this.triggerHideFn)
			},

			// 鼠标按压事件处理器
			clickDocumentHandler () {
				this.$emit('update:show', false)
			},

			// 右键事件事件处理
			contextMenuHandler (e) {
				console.log(e)
				this.x = e.clientX + this.offset.x
				this.y = e.clientY + this.offset.y
				this.layout()
				e.preventDefault()
			},

			// 布局
			layout () {
				this.style = {
					left: this.x + 'px',
					top: this.y + 'px'
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.context_menu_box
		padding 10px
		font-size 12px
</style>
