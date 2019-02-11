<template>
	<div class="select_data_box h-panel">
		<div class="h-panel-bar">
			<span class="h-panel-title">选择数据</span>
			<SwitchList class="h-panel-right" v-model="selectType" :datas="typeList"></SwitchList>
		</div>
		<div class="content h-panel-body" v-show="selectType === '数据库'">
			<Tree class="tree_box" :option="treeConfig" ref="tableTree" :multiple="true" v-model="selectTable" choose-mode="some"></Tree>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {db} from '@/mixins'

	export default {
		mixins: [db],
		data () {
			return {
				selectType: '数据库',
				typeList: ['数据库', 'http'],
				selectTable: [],
				treeConfig: {
					keyName: 'id',
					titleName: 'name',
					parentName: 'dbId',
					dataMode: 'list',
					getDatas: async (parent, resolve) => {
						if (!parent) {
							this.$nextTick(() => {
								resolve(this.tableDbTree)
							})
							return
						}
						if (parent.isDbLibrary) {
							console.log(parent)
							await this.fetchDbInfo(parent)
							this.$nextTick(() => {
								resolve(this.$store.getters.tableTree(parent.id))
							})
						}else {
							this.$nextTick(() => {
								resolve([])
							})
						}
					}
				}
			}
		},
		computed: {
			...mapGetters({
				tableDbTree: 'tableDbTree'
			})
		},
		methods: {
			generate () {
				let selectTable = this.$refs.tableTree.getFullChoose().filter(item => {
					return !item.isDbLibrary
				})
				selectTable = selectTable.map(item => {
					return this.$store.getters.tableDetail(item)
				})
				return selectTable
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.select_data_box
		display flex
		flex 1
		flex-direction column
		.content
			padding 10px
			min-height 200px
			overflow-y auto
			box-sizing border-box
			>>> .h-tree-ul
				.h-tree-show-expand
					display none
</style>
