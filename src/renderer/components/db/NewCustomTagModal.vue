<template>
	<Modal v-model="isShow" :transfer="false" title="添加自定义标签" width="400">
		<div class="add_custom_tag_box">
			<Form ref="form" :model="baseModel" :rules="rule" :label-width="0">
				<FormItem label="" prop="name">
					<Input v-model="baseModel.name" placeholder="请输入标签名称"></Input>
				</FormItem>
				<FormItem label="" prop="key">
					<Input v-model="baseModel.key" placeholder="请输入标签KEY"></Input>
				</FormItem>
				<FormItem label="" prop="color">
					<Select v-model="baseModel.color" placeholder="请选择颜色" >
						<Option v-for="item in colorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
			</Form>
		</div>
		<div class="footer_box" slot="footer">
			<Button type="primary" @click="addCustomTag">添加</Button>
		</div>
	</Modal>
</template>

<script>
	import CustomTag from '@/model/CustomTag'
	export default {
		data () {
			return {
				isShow: false,
				baseModel: {
					name: '',
					key: '',
					color: 'blue'
				},
				rule: {
					name: [
						{ required: true, message: '标签名不能为空' }
					],
					key: [
						{ required: true, message: '标签KEY不能为空' }
					],
					color: [
						{ required: true, message: '标签颜色不能为空' }
					]
				},
				colorList: [
					{
						value: 'blue',
						label: '蓝色'
					},
					{
						value: 'red',
						label: '红色'
					},
					{
						value: 'yellow',
						label: '黄色'
					},
					{
						value: 'gold',
						label: '金色'
					},
					{
						value: 'purple',
						label: '紫色'
					}
				]
			}
		},
		methods: {
			show () {
				this.$refs.form.resetFields()
				this.baseModel.color = 'blue'
				this.isShow = true
			},
			async addCustomTag () {
				try {
					const valid = await this.$refs.form.validate()
					if (!valid) {
						return
					}
					const customTag = new CustomTag(this.baseModel)
					await this.$store.dispatch('addNewCustomTag', customTag)
					this.$Message.success('添加自定义标签成功')
					this.isShow = false
				} catch (err) {
					console.error(err)
					this.$Message.error(err.message)
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.add_custom_tag_box
		background #fff
		padding 0 20px
	.footer_box
		display flex
		justify-content flex-end
</style>
