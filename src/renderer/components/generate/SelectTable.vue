<template>
	<Card class="content_box">
		<Tree ref="tableTree" class="table_tree" :data="tableTree" show-checkbox check-directly ></Tree>
		<div class="footer">
			<Button @click="back">上一步</Button>
			<Button type="primary" :loading="loading" @click="nextStep1">下一步</Button>
		</div>
	</Card>
</template>

<script>
	export default {
		props: {
			loading: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				tableTree: []
			}
		},
		mounted () {
			this.tableTree = JSON.parse(JSON.stringify(this.$store.getters.tableTree))
		},
		methods: {
			reset () {
				this.tableTree = JSON.parse(JSON.stringify(this.$store.getters.tableTree))
			},
			back () {
				this.$emit('changeStep', 0)
			},
			nextStep1 () {
				this.$emit('generate')
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.footer
		display flex
		align-items center
		justify-content space-between !important
</style>
