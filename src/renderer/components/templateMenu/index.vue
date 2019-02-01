<template>
	<div class="table_menu_box" v-if="model">
		<div
			v-tooltip
			placement="top-start"
			theme="white"
			className="test"
			:content="model.path"
			class="title_box"
			tabindex="0"
			@dblclick="changeType"
			@contextmenu="showContextMenu">
			<div class="iconfont"></div>
			<div class="name">{{ model.name }}</div>
		</div>
		<div class="child_box" v-show="open" v-if="isHasChildren">
			<template-menu
				class="item"
				v-for="(model, index) in model.children"
				:key="item.id"
				:model="model">
			</template-menu>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'template-menu',
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
			}
		},
		methods: {
			changeType () {},
			showContextMenu () {}
		}
	}
</script>

<style lang="stylus" scoped>
	.table_menu_box
		width fit-content
		.title_box
			display flex
			align-items center
			width fit-content
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
				width fit-content
				padding-left 5px
		.child_box
			padding 5px 0 0 20px
		@keyframes dbLoad
			0%
				transform rotate(0)
			100%
				transform rotate(360deg)
</style>
