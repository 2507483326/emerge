<template>
	<section class="container">
		<!--头部-->
		<base-header></base-header>
		<!--左侧菜单-->
		<section ref="tableMenuBox">
			<table-menu :model="item" :key="item.name" @showContextMenu="showContextMenu" v-for="item in dbList"></table-menu>
		</section>
		<!--右键菜单-->
		<context-menu ref="contextMenu"
					  @update:show="(show) => isRightMenuShow = show"
					  :show="isRightMenuShow" class="right_menu">
			<div @click="test">test</div>
			<div>test</div>
			<div>test</div>
		</context-menu>
	</section>
</template>

<script>
	import tableMenu from '@/components/tableMenu'
	import contextMenu from '@/components/contextMenu'
	import baseHeader from '@/components/baseHeader'
	import { mapState } from 'vuex'
	export default {
		data () {
			return {
				isRightMenuShow: false,
				selectModel: null
			}
		},
		computed: {
			...mapState({
				dbList: state => state.db.dbList
			})
		},
		mounted () {
		},
		methods: {
			test ($event) {
				console.log($event)
			},
			showContextMenu ($event, model) {
				this.selectModel = model
				this.$refs.contextMenu.contextMenuHandler($event)
				this.isRightMenuShow = true
			}
		},
		components: {
			baseHeader,
			tableMenu,
			contextMenu
		}
	}
</script>

<style lang="stylus" scoped>
	/* CSS */
	.right_menu
		position fixed
		background #fff
		border solid 1px rgba(0, 0, 0, .2)
		border-radius 3px
		z-index 999
		display none
</style>
