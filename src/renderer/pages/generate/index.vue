<template>
	<div class="container">
		<!--头部-->
		<base-header></base-header>
		<!--内容-->
		<div class="content_box">
			<Steps class="steps_box" :datas="scheduleMessage" :step="schedule"></Steps>
			<div class="components_box">
				<component @generateData="generateData" @generateConfig="generateConfig" :is="scheduleMessage[schedule].component"></component>
			</div>
		</div>
	</div>
</template>

<script>
	import baseHeader from '@/components/baseHeader'
	import selectTableData from '@/components/selectTableData'
	import generateConfig from '@/components/generateConfig'
	import { genTemplateToFile } from '@/tools/generateArt'
	import { mapGetters } from 'vuex'
	export default {
		data () {
			return {
				scheduleMessage: [
					{
						key: 'a',
						title: '数据',
						icon: 'h-icon-task',
						component: 'select-table-data'
					},
					{
						key: 'b',
						title: '配置',
						icon: 'h-icon-setting',
						component: 'generate-config'
					},
					{
						key: 'b',
						title: '完成',
						icon: 'h-icon-completed'
					}
				],
				generateDataList: [],
				generateConfigObj: null,
				schedule: 0
			}
		},
		computed: {
			...mapGetters({
				filterList: 'filterList'
			})
		},
		methods: {
			generateData (dataList) {
				this.generateDataList = dataList
				if (!this.generateDataList || this.generateDataList.length === 0) {
					this.$Message['warn']('请选择需要生成的数据')
					return
				}
				this.schedule = 1
			},
			generateConfig (data) {
				this.generateConfigObj = data
				// this.schedule = 2
				genTemplateToFile(this, this.generateDataList, this.generateConfigObj, this.filterList)
			}
		},
		components: {
			baseHeader,
			selectTableData,
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
</style>
