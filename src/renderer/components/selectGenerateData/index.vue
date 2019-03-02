<template>
	<div class="select_data_box h-panel">
		<div class="h-panel-bar">
			<span class="h-panel-title">选择数据</span>
			<SwitchList class="h-panel-right" v-model="selectType" :datas="typeList"></SwitchList>
		</div>
		<div class="content h-panel-body" v-show="selectType === '数据库'">
			<div class="no_data_tip_box" v-show="!selectTable">请新建数据库连接</div>
			<Tree class="tree_box" :option="treeConfig" ref="tableTree" :multiple="true" v-model="selectTable" choose-mode="some"></Tree>
		</div>
		<div class="content h-panel-body" v-show="selectType === 'json'">
			<div class="json_editor_box">
				<div class="json_editor" ref="jsonEditor"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {db} from '@/mixins'
	import JsonEditor from 'jsoneditor'
	export default {
		mixins: [db],
		data () {
			return {
				selectType: '数据库',
				typeList: ['数据库', 'json'],
				selectTable: [],
				jsonEditor: null,
				treeConfig: {
					keyName: 'id',
					titleName: 'name',
					parentName: 'dbId',
					dataMode: 'list',
					getDatas: async (parent, resolve) => {
						if (!parent) {
							this.$nextTick(() => {
								resolve(this.tableDbTree.map(item => {
										item.disabled = true
									return item
								}))
							})
							return
						}
						if (parent.isDbLibrary) {
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
		mounted () {
			this.initJsonEditor()
		},
		destroyed () {
			if (this.jsonEditor) {
				this.jsonEditor.destroy();
			}
		},
		computed: {
			...mapGetters({
				tableDbTree: 'tableDbTree'
			})
		},
		methods: {
			initJsonEditor () {
				this.jsonEditor = new JsonEditor(this.$refs.jsonEditor, {
					mode: 'text',
					modes: ['code', 'form', 'text', 'tree', 'view'],
					indentation: 2
				})
			},
			generate () {
				if (this.selectType === '数据库') {
					return this.generateSql()
				} else if (this.selectType === 'json') {
					return this.generateJson()
				}
			},
			generateSql () {
				let selectTables = this.$refs.tableTree.getFullChoose().filter(item => {
					return !item.isDbLibrary
				})
				selectTables = selectTables.map(item => {
					return this.$store.getters.tableDetail(item)
				})
				return selectTables
			},
			generateJson () {
				let resultList = []
				resultList.push(this.jsonEditor.get())
				console.log(resultList)
				return resultList
			}
		}
	}
</script>
<style>
	@import "~jsoneditor/dist/jsoneditor.min.css";
</style>
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
