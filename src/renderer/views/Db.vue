<template>
	<div class="db_box">
		<left-menu @selectTable="selectTable"></left-menu>
		<div class="main_box">
			<table-detail-box v-if="dbTable" :table="dbTable" :dbId="dbId"></table-detail-box>
		</div>
		<new-db-modal ref="newDbModal"></new-db-modal>
		<div class="right_action_box">
			<Tooltip content="新建数据库" placement="left">
				<div class="button_box" @click="showNewDbModal">
					<span class="iconfont icon-jiahao"></span>
				</div>
			</Tooltip>
		</div>
	</div>
</template>

<script>
	import LeftMenu from '@/components/db/LeftMenu'
	import NewDbModal from '@/components/db/NewDbModal'
	import TableDetailBox from '@/components/db/TableDetailBox'
	export default {
		components: {
			LeftMenu,
			NewDbModal,
			TableDetailBox
		},
		data () {
			return {
				dbTable: null,
				dbId: null
			}
		},
		methods: {
			showNewDbModal () {
				this.$refs.newDbModal.show()
			},
			selectTable (tableModel) {
				console.log(tableModel)
				const index = this.$store.state.db.dbTableMap[tableModel.dbId].findIndex(item => {
					return item.tableName === tableModel.tableName
				})
				if (index >= 0) {
					this.dbTable = this.$store.state.db.dbTableMap[tableModel.dbId][index]
					this.dbId = tableModel.dbId
					console.log(this.dbTable)
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.db_box
		height 100%
		width 100%
		position relative
		transform translate(0, 0)
		display flex
		.main_box
			flex 1
			height 100%
		.right_action_box
			position fixed
			right 10px
			bottom 10px
			width 40px
			height 40px
			.button_box
				font-size 14px
				color #fff
				width 40px
				height 40px
				display flex
				align-items center
				justify-content center
				background #2d8cf0
				border-radius 50%
				cursor pointer
</style>
