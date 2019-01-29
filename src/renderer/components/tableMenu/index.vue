<template>
	<div class="table_menu_box">
		<div
			class="title_box"
			@click="toggle"
			@dblclick="changeType">
			<div class="iconfont" :class="getIconClass"></div>
			<div class="name">{{ model.name }}</div>
		</div>
		<div class="child_box" v-show="open" v-if="isFolder">
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
			isFolder: function () {
				return this.model.children &&
					this.model.children.length
			},
			getIconClass () {
				return this.isFolder ? 'icon-shujuku' : 'icon-biao'
			}
		},
		methods: {
			toggle: function () {
				if (this.isFolder) {
					this.open = !this.open
				}
			},
			changeType: function () {
				if (!this.isFolder) {
					this.$set(this.model, 'children', [])
					this.addChild()
					this.open = true
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
			.name
				padding-left 5px
		.child_box
			padding 5px 0 0 20px
</style>
