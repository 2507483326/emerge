<template>
	<div class="table_menu_box">
		<div
			class="title_box"
			tabindex="0"
			@dblclick="changeType"
			@contextmenu="showContextMenu">
			<div class="iconfont" :class="{'icon-shujuku': model.isDbLibrary && !isConnect, 'icon-jiazai': isConnect,
			'loading': isConnect, 'connect': model.isConnect, 'icon-biao': !model.isDbLibrary}"></div>
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
	import { db } from '@/mixins'
	export default {
		name: 'table-menu',
		mixins: [db],
		props: {
			model: Object
		},
		data () {
			return {
				isConnect: false,
				open: false
			}
		},
		computed: {
			isHasChildren: function () {
				return this.model.children &&
					this.model.children.length
			}
		},
		methods: {
			async changeType () {
				if (!this.model.isDbLibrary) {
					this.$bus.emit('selectTable', {dbId: this.model.dbId, tableName: this.model.name})
					return
				}
				if (!this.isHasChildren && !this.model.isConnect) {
					await this.connectDb()
				}
				this.$nextTick(() => {
					if (this.isHasChildren) {
						this.open = !this.open
					}
				})
			},
			showContextMenu ($event) {
				this.$emit('showContextMenu', $event, this.model)
			},
			async refreshDb (id) {
				if (!this.model.isDbLibrary) {
					return
				}
				if (id === this.model.id) {
					await this.connectDb()
				}
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
			.iconfont
				&.connect
					color green
				&.loading
					animation dbLoad 1s infinite linear
			.name
				padding-left 5px
		.child_box
			padding 5px 0 0 20px
		@keyframes dbLoad
			0%
				transform rotate(0)
			100%
				transform rotate(360deg)
</style>
