<template>
	<div class="container">
		<!--头部-->
		<base-header></base-header>
		<!--内容-->
		<div class="content_box">
			<Steps class="steps_box" :datas="scheduleMessage" :step="schedule"></Steps>
			<div class="components_box">
				<component :is="scheduleMessage[schedule].component"></component>
			</div>
		</div>
	</div>
</template>

<script>
	import baseHeader from '@/components/baseHeader'
	import selectData from '@/components/selectData'
	export default {
		data () {
			return {
				scheduleMessage: [
					{
						key: 'a',
						title: '数据',
						icon: 'h-icon-task',
						component: 'select-data'
					},
					{
						key: 'b',
						title: '配置',
						icon: 'h-icon-setting'
					},
					{
						key: 'b',
						title: '完成',
						icon: 'h-icon-completed'
					}
				],
				schedule: 0
			}
		},
		components: {
			baseHeader,
			selectData
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
