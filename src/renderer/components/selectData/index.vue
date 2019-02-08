<template>
	<div class="select_data_box">
		<SwitchList v-model="selectType" :datas="typeList"></SwitchList>
		<div class="content" v-show="selectType === '数据库'">
			<Tree class="tree_box" :option="treeConfig" ref="demo" :multiple="true" v-model="selectTable" choose-mode="some"></Tree>
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
		}
	}
</script>

<style lang="stylus" scoped>
	.select_data_box
		.content
			>>> .h-tree-ul
				.h-tree-show-expand
					display none
</style>
