<template>
	<section class="container">
		<!--头部-->
		<base-header></base-header>
		<!--main-->
		<div class="main_box">
			<!--左侧菜单-->
			<section ref="tableMenuBox" class="table_menu_wrap">
				<div class="table_menu_inner">
					<table-menu ref="tableMenu" :model="item" :key="item.name"
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
			<div @click="refresh">刷新</div>
			<div @click="close">关闭连接</div>
			<div @click="deleteDb">删除</div>
		</context-menu>
	</section>
</template>

<script>
	import tableMenu from '@/components/tableMenu'
	import contextMenu from '@/components/contextMenu'
	import baseHeader from '@/components/baseHeader'
	import { mapGetters } from 'vuex'
	export default {
		data () {
			return {
				isRightMenuShow: false,
				menuSelectModel: null,
				columns: [
					{ title: '列名', prop: 'columnName' },
					{ title: '类型', prop: 'typeName' },
					{ title: '长度', prop: 'columnSize' },
					{ title: '不是null', prop: 'nullAble' },
					{ title: '主键', prop: 'isPrimaryKey' },
					{ title: '注释', prop: 'remarks' }
				],
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
				this.$refs.tableMenu.forEach(item => {
					item.refreshDb(this.menuSelectModel.id)
				})
				this.isRightMenuShow = false
			},
			close () {
				this.$store.dispatch('closeConnect', this.menuSelectModel.id)
				this.isRightMenuShow = false
			},
			deleteDb () {
				this.isRightMenuShow = false
				this.$Confirm("确定删除？", "删除数据库").then(async () => {
					await this.$store.dispatch('deleteDb', this.menuSelectModel.id)
					this.$Message.success('删除成功！')
				})
			},
			showContextMenu ($event, model) {
				this.menuSelectModel = model
				this.$refs.contextMenu.contextMenuHandler($event)
				this.isRightMenuShow = true
			},
			selectTable (data) {
				let tableVo = this.$store.getters.tableDetail(data)
				this.columnVoList = tableVo.columnVoList
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
	.main_box
		display flex
		margin-top 10px
		flex 1
		.table_menu_wrap
			width 200px
			overflow-y auto
			overflow-x auto
			box-sizing border-box
			background #fff
			.table_menu_inner
				width fit-content
				padding 10px
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
