<template>
	<div class="container">
		<!--头部-->
		<base-header></base-header>
		<!--内容-->
		<div class="content_box">
			<header class="header_box">
				<Button color="primary" @click="newGlobalParams">新增函数</Button>
			</header>
			<div class="show_list_box">
				<div class="list_box" :key="item.id" v-for="(item, index) in globalParamsList">
					<div class="message_box">
						<div class="name">{{item.name}}</div>
						<div class="type h-tag">{{getName(item.type)}}</div>
					</div>
					<div class="button_box">
						<Button class="button_list" color="primary" @click="updateGlobalParams(index)">修改</Button>
						<Button class="button_list" color="red" @click="deleteGlobalParams(index)">删除</Button>
					</div>
				</div>
			</div>
		</div>
		<new-global-params ref="newGlobalParams"></new-global-params>
	</div>
</template>

<script>
	import baseHeader from '@/components/baseHeader'
	import {mapGetters} from 'vuex'
	import {noRepeat} from '@/annotation'
	import newGlobalParams from '@/components/newGlobalParams'
	export default {
		data () {
			return {
				typeList: [{
					key: 0,
					title: '过滤器'
				}, {
					key: 1,
					title: '变量'
				}, {
					key: 2,
					title: '方法'
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
					required: ['type', 'name', 'value']
				}
			}
		},
		computed: {
			...mapGetters({
				globalParamsList: 'globalParamsList'
			})
		},
		methods: {
			getName (type) {
				return this.typeList.find(item => item.key === type).title
			},
			@noRepeat
			async newGlobalParams () {
				this.$refs.newGlobalParams.show({
					isAdd: true
				})
			},
			@noRepeat
			async updateGlobalParams (index) {
				this.$refs.newGlobalParams.show({
					isAdd: false,
					params: this.globalParamsList[index]
				})
			},
			@noRepeat
			async deleteGlobalParams (index) {
				let typeName = this.getName(this.globalParamsList[index].type)
				this.$Confirm(`删除${typeName}`, "确定删除？").then(async () => {
					try {
						await this.$store.dispatch('deleteGlobalParams', this.globalParamsList[index])
						this.$Message['success'](`删除${typeName}成功`)
					} catch (e) {
						console.log(e)
						this.$Message['error'](`删除${typeName}失败`)
					}
				})
			}
		},
		components: {
			baseHeader,
			newGlobalParams
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
		.show_list_box
			flex 1
			overflow-y auto
			margin-top 10px
			.list_box
				background #fff
				border 1px solid #eee
				margin-bottom 10px
				border-radius 5px
				display flex
				padding 10px
				align-items center
				justify-content space-between
				.message_box
					display flex
					align-items center
					.name
						font-size 22px
						margin-right 5px
					.type
						line-height 1em
						font-size 10px
				.button_box
					overflow hidden
					display flex
					.button_list
						margin-left 10px
		.show_icon
			cursor pointer

</style>
