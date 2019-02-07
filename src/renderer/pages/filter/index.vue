<template>
	<div class="container">
		<!--头部-->
		<base-header></base-header>
		<!--内容-->
		<div class="content_box">
			<div class="h-panel filter_item" v-for="(item, index) in filterArray">
				<div class="h-panel-bar">
					<div class="h-panel-bar">
						<span class="h-panel-title">新增过滤器</span>
						<span class="h-panel-right"><a>More</a></span>
					</div>
					<div class="h-panel-body">
						<Form class="form_box" ref="form" :rules="validationRules" :label-position="'left'" :label-width="100"  :model="item">
							<FormItem label="过滤器名称" prop="name">
								<input type="text" placeholder="请输入过滤器名称" v-model="item.name"/>
							</FormItem>
							<FormItem label="过滤器内容" prop="value">
								<textarea v-model="item.value"></textarea>
							</FormItem>
						</Form>
						<Button class="new_filter" color="primary" @click="newFilter(index)">新增</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import baseHeader from '@/components/baseHeader'

	export default {
		data () {
			return {
				filterArray: [{
					id: 0,
					name: '',
					value: ''
				}],
				validationRules: {
					rules: {
						name: {
							maxLen: 20,
							minLen: 1
						},
						value: {
							maxLen: 200,
							minLen: 1
						}
					},
					required: ['name', 'value']
				},
			}
		},
		methods: {
			newFilter (index) {
				let validResult = this.$refs.form[index].valid()
				if (!validResult.result) return false
				this.$store.dispatch('addFilter', this.filterArray[index])
			}
		},
		components: {
			baseHeader
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
		.filter_item
			margin 10px
		.new_filter
			display block
			width 100%
			margin-top 30px
</style>
