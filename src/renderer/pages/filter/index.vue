<template>
	<div class="container">
		<!--头部-->
		<base-header></base-header>
		<!--内容-->
		<div class="content_box">
			<div class="h-panel filter_item" :key="item.id" v-for="(item, index) in filterList">
				<div class="h-panel-bar">
					<div class="h-panel-bar">
						<span class="h-panel-title" v-show="item.id === 0">新增过滤器</span>
						<span class="h-panel-title" v-show="item.id !== 0">{{item.name}}</span>
						<i class="show_icon h-icon-down h-panel-right" v-show="item.id !== 0"
						   @click="changeShow(index)"></i>
					</div>
					<div class="h-panel-body" v-show="item.id === 0 || item.isShow">
						<Form class="form_box" ref="form" :rules="validationRules" :label-position="'left'"
							  :label-width="100" :model="item">
							<FormItem label="过滤器名称" prop="name">
								<input type="text" placeholder="请输入过滤器名称" v-model="item.name"/>
							</FormItem>
							<FormItem label="过滤器内容" prop="value">
								<textarea v-model="item.value" placeholder="请输入过滤器内容"></textarea>
							</FormItem>
						</Form>
						<Button v-show="item.id === 0" class="new_filter" color="primary" @click="newFilter(index)">新增
						</Button>
						<div class="button_box" v-show="item.id !== 0">
							<Button class="button_list" color="primary" @click="updateFilter(index)">修改</Button>
							<Button class="button_list" color="red" @click="deleteFilter(index)">删除</Button>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import baseHeader from '@/components/baseHeader'
	import {mapGetters} from 'vuex'
	import {noRepeat} from '@/annotation'

	export default {
		data () {
			return {
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
				}
			}
		},
		computed: {
			...mapGetters({
				filterList: 'filterList'
			})
		},
		methods: {
			@noRepeat
			async newFilter (index) {
				let validResult = this.$refs.form[index].valid()
				if (!validResult.result) return false
				try {
					await this.$store.dispatch('addFilter', this.filterList[index])
					this.filterList[index].name = ''
					this.filterList[index].value = ''
					this.$Message['success']('创建过滤器成功')
				} catch (e) {
					console.error(e)
					this.$Message['error']('创建过滤器失败')
				}
			},
			@noRepeat
			async updateFilter (index) {
				let validResult = this.$refs.form[index].valid()
				if (!validResult.result) return false
				try {
					this.$store.dispatch('updateFilter', this.filterList[index])
					this.$Message['success']('修改过滤器成功')
				} catch (e) {
					console.error(e)
					this.$Message['error']('修改过滤器失败')
				}
			},
			@noRepeat
			deleteFilter (index) {
				this.$Confirm("删除数据库", "确定删除？").then(async () => {
					try {
						this.$store.dispatch('deleteFilter', this.filterList[index])
						this.$Message['success']('删除过滤器成功')
					} catch (e) {
						console.error(e)
						this.$Message['error']('删除过滤器失败')
					}
				})
			},
			changeShow (index) {
				console.log('changeShow')
				this.$store.dispatch('changeFilterShow', this.filterList[index])
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
		.show_icon
			cursor pointer
		.button_box
			overflow hidden
			padding-top 10px
			.button_list
				float right
				margin-left 10px
</style>
