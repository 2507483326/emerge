<template>
	<Card class="content_box">
		<Tree ref="tableTree" class="table_tree" :data="tableTree" show-checkbox check-directly ></Tree>
		<div class="footer">
			<Button type="primary" @click="nextStep1">下一步</Button>
		</div>
	</Card>
</template>

<script>
	export default {
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
			nextStep1 () {
				this.$emit('generate')
			}
		}
	}
</script>
