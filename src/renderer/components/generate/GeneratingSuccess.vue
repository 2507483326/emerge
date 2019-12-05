<template>
	<Card class="content_box">
		<div class="finnish_box">
			<div class="finnish_icon_box">
				<Icon type="md-done-all" />
				<div class="tip">模板生成完成</div>
			</div>
		</div>
		<div class="footer">
			<Button type="primary" @click="nextStep1">完成</Button>
		</div>
	</Card>
</template>

<script>
	export default {
		methods: {
			nextStep1 () {
				this.$emit('finish')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.finnish_box
		flex 1
		display flex
		align-items center
		justify-content center
		.finnish_icon_box
			width 200px
			height 200px
			border 1px solid #eee
			border-radius 50%
			font-size 40px
			color #19be6b
			display flex
			align-items center
			justify-content center
			flex-direction column
			.tip
				font-size 20px
				color #000
				margin-top 10px
</style>
