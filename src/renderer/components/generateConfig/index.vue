<template>
	<div class="generate_config_box h-panel">
		<div class="h-panel-bar">
			<span class="h-panel-title">配置</span>
		</div>
		<div class="content_box h-panel-body">
			<Form ref="form" :label-position="'left'" :label-width="100" :rules="validationRules" :model="generateConfigData">
				<FormItem label="生成路径" prop="path">
					<input type="text" placeholder="请输入路径名称" v-model="generateConfigData.path"/>
					<Button icon="iconfont icon-gengduo" class="select_path" @click="selectPath"></Button>
				</FormItem>
				<FormItem label="模板" prop="path">
					<TreePicker ref="templateTree" :option="templateTreeConfig" multiple
								filterable v-model="generateConfigData.templateList"></TreePicker>
				</FormItem>
			</Form>
		</div>
	</div>
</template>

<script>
	import { selectPath } from '@/mixins'
	import { mapGetters } from 'vuex'
	export default {
		mixins: [selectPath],
		data () {
			return {
				generateConfigData: {
					path: '',
					templateList: []
				},
				validationRules: {
					required: ['path']
				},
				templateTreeConfig: {
					keyName: 'id',
					parentName: 'folderId',
					titleName: 'name',
					dataMode: 'list',
					datas: () => this.templateTree
				}
			}
		},
		computed: {
			...mapGetters({
				templateTree: 'templateList'
			})
		},
		methods: {
			async selectPath () {
				if (this.isShowSelectPath) return
				this.isShowSelectPath = true
				this.generateConfigData.path = await this.selectDirectoryPath('选择生成路径')
				this.isShowSelectPath = false
			},
			generate () {
				let validResult = this.$refs.form.valid()
				if (!validResult.result) return false
				let templateList = this.$refs.templateTree.getFullChoose().filter(item => {
					return !item.isFolder
				})
				return {
					path: this.generateConfigData.path,
					templateList
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.generate_config_box
		display flex
		margin 10px 0
		flex-direction column
		.content_box
			padding 10px
			box-sizing border-box
			flex 1
			overflow-y auto
	.h-form
		.h-form-item
			>>> .h-form-item-wrap
				display flex
				.select_path
					word-break keep-all
					margin-left 10px
					.iconfont
						font-size 13px
</style>
