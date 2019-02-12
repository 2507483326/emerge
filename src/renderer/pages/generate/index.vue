<template>
	<div class="container">
		<!--头部-->
		<base-header></base-header>
		<!--内容-->
		<div class="content_box">
			<div class="components_box">
				<generate-config ref="generateConfig"></generate-config>
				<select-generate-data ref="selectGenerateData"></select-generate-data>
			</div>
			<Button @click="generate" class="generate_button" color="primary">生成</Button>
			<Loading text="加载中" :loading="loading"></Loading>
		</div>
	</div>
</template>

<script>
	import baseHeader from '@/components/baseHeader'
	import selectGenerateData from '@/components/selectGenerateData'
	import generateConfig from '@/components/generateConfig'
	import { genTemplateToFile } from '@/tools/generateArt'
	import { mapGetters } from 'vuex'
	import { noRepeat } from '@/annotation'
	export default {
		data () {
			return {
				scheduleMessage: [
					{
						key: 'a',
						title: '数据',
						icon: 'h-icon-task',
						component: 'select-generate-data'
					},
					{
						key: 'b',
						title: '配置',
						icon: 'h-icon-setting',
						component: 'generate-config'
					}
				],
				generateDataList: [],
				generateConfigObj: null,
				schedule: 0,
				loading: false
			}
		},
		computed: {
			...mapGetters({
				globalParamsList: 'globalParamsList'
			})
		},
		methods: {
			@noRepeat
			generate () {
				this.loading = true
				this.generateDataList = this.$refs.selectGenerateData.generate()
				if (!this.generateDataList || this.generateDataList.length === 0) {
					this.$Message['warn']('请选择需要生成的数据')
					this.loading = false
					return
				}
				this.generateConfigObj = this.$refs.generateConfig.generate()
				genTemplateToFile(this, this.generateDataList, this.generateConfigObj, this.globalParamsList)
				this.$Message['success']('生成代码成功')
				this.loading = false
			}
		},
		components: {
			baseHeader,
			selectGenerateData,
			generateConfig
		}
	}
</script>

<style lang="stylus" scoped>
	.content_box
		flex 1
		background #fff
		margin-top 10px
		overflow-y auto
		padding 10px
		box-sizing border-box
		display flex
		flex-direction column
		width 100%
		.steps_box
			max-width 300px
			width 100%
			margin 0 auto
			.h-steps-icon
				display flex
				justify-content center
		.components_box
			flex 1
			margin-top 10px
			overflow-y auto
			padding 10px
			box-sizing border-box
	.generate_button
		font-size 12px
		margin 10px
</style>
