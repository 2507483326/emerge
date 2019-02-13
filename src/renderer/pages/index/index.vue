<template>
	<section class="container">
		<!--头部-->
		<base-header></base-header>
		<!--main-->
		<div class="main_box">
			<!--左侧菜单-->
			<section ref="tableMenuBox" class="left_menu_box" @contextmenu.prevent.self.stop="showContextMenu">
				<div class="left_menu_inner">
					<table-menu ref="tableMenu" :model="item" :key="item.id"
								@showContextMenu="showContextMenu" v-for="item in menuList"></table-menu>
				</div>
			</section>
			<!--右侧详细-->
			<section class="table_detail_box">
				<Table :datas="columnVoList" :columns="columns">
					<div slot="empty">自定义提醒：暂时无数据</div>
				</Table>
			</section>
		</div>

		<!--右键菜单-->
		<context-menu ref="contextMenu"
					  @update:show="(show) => isRightMenuShow = show"
					  :show="isRightMenuShow" class="right_menu">
			<template v-if="menuSelectModel == null">
				<div @click="addDbLibrary">新建连接</div>
			</template>
			<template v-else>
				<div @click="refresh">刷新</div>
				<div @click="close">关闭连接</div>
				<div @click="deleteDb">删除</div>
			</template>
		</context-menu>
		<!--弹窗-->
		<section class="modal_box">
			<new-connect-model ref="newConnectModel"></new-connect-model>
		</section>
	</section>
</template>

<script>
	import tableMenu from '@/components/tableMenu'
	import contextMenu from '@/components/contextMenu'
	import baseHeader from '@/components/baseHeader'
	import newConnectModel from '@/components/newConnectModel'
	import {mapGetters} from 'vuex'
	import { $const } from '@/common'
	export default {
		data () {
			return {
				isRightMenuShow: false,
				menuSelectModel: null,
				columns: $const['TABLE/COLUMN'],
				columnVoList: []
			}
		},
		computed: {
			...mapGetters({
				menuList: 'menuList'
			})
		},
		created () {
			this.$bus.on('selectTable', this.selectTable)
		},
		beforeDestroy () {
			this.$bus.off('selectTable', this.selectTable)
		},
		methods: {
			refresh () {
				this.isRightMenuShow = false
				this.$refs.tableMenu.forEach(item => {
					item.refreshDb(this.menuSelectModel.id)
				})
			},
			close () {
				this.isRightMenuShow = false
				this.$store.dispatch('closeConnect', this.menuSelectModel.id)
			},
			deleteDb () {
				this.isRightMenuShow = false
				this.$Confirm("删除数据库", "确定删除？").then(async () => {
					try {
						await this.$store.dispatch('deleteDb', this.menuSelectModel.id)
						this.$Message['success']('删除成功!')
					} catch (e) {
						console.error(e)
						this.$Message['error']('删除失败!')
					}
				})
			},
			showContextMenu ($event, model) {
				this.isRightMenuShow = true
				this.menuSelectModel = model
				this.$refs.contextMenu.contextMenuHandler($event)
			},
			selectTable (data) {
				let tableVo = this.$store.getters.tableDetail(data)
				this.columnVoList = tableVo.columnVoList
			},
			addDbLibrary () {
				this.isRightMenuShow = false
				this.$refs.newConnectModel.show()
			}
		},
		components: {
			baseHeader,
			tableMenu,
			contextMenu,
			newConnectModel
		}
	}
</script>

<style lang="stylus" scoped>
	@import "../../assets/stylus/leftMenu.stylus"
	/* CSS */
	.main_box
		display flex
		margin-top 10px
		flex 1
		.table_detail_box
			flex 1
			background #fff
			margin-left 10px
			box-sizing border-box
			padding 10px
			overflow-y auto

	.right_menu
		position fixed
		background #fff
		border solid 1px rgba(0, 0, 0, .2)
		border-radius 3px
		z-index 999
		display none
</style>
