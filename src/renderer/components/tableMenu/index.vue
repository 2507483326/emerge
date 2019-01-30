<template>
	<div class="table_menu_box">
		<div
			class="title_box"
			tabindex="0"
			@dblclick="changeType"
			@contextmenu="showContextMenu">
			<div class="iconfont" :class="getIconClass"></div>
			<div class="name">{{ model.name }}</div>
		</div>
		<div class="child_box" v-show="open" v-if="isHasChildren">
			<table-menu
				class="item"
				v-for="(model, index) in model.children"
				:key="index"
				:model="model">
			</table-menu>
		</div>
	</div>
</template>

<script>
	import { jarTool } from '@/tools'
	import { cmd } from '@/common'
	export default {
		name: 'table-menu',
		props: {
			model: Object
		},
		data () {
			return {
				open: false
			}
		},
		computed: {
			isHasChildren: function () {
				return this.model.children &&
					this.model.children.length
			},
			getIconClass () {
				return this.isHasChildren ? 'icon-shujuku' : 'icon-biao'
			}
		},
		methods: {
			async changeType () {
				try {
					if (this.model.isDbLibrary && !this.isHasChildren) {
						console.log('请求下面所有的表')
						console.log(this.model.connectConfig)
						let result = await jarTool.exec(cmd.GET_DB_INFO, this.model.connectConfig)
						console.log(result)
					}
					if (!this.isHasChildren) {
						this.open = !this.open
					}
				} catch (e) {
					console.error(e)
					this.$Message['error']('获取数据库信息失败')
				}
			},
			showContextMenu ($event) {
				this.$emit('showContextMenu', $event, this.model)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.table_menu_box
		.title_box
			display flex
			align-items center
			justify-content flex-start
			cursor pointer
			user-select none
			height 20px
			&:focus
				background #eee
				outline none
			.name
				padding-left 5px
		.child_box
			padding 5px 0 0 20px
</style>
