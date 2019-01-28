<template>
	<div>
		<div
			:class="{bold: isFolder}"
			@click="toggle"
			@dblclick="changeType">
			{{ model.name }}
			<span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
		</div>
		<ul v-show="open" v-if="isFolder">
			<table-menu
				class="item"
				v-for="(model, index) in model.children"
				:key="index"
				:model="model">
			</table-menu>
			<li class="add" @click="addChild">+</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'table-menu',
		props: {
			model: Object
		},
		data: function () {
			return {
				open: false
			}
		},
		computed: {
			isFolder: function () {
				return this.model.children &&
					this.model.children.length
			}
		},
		methods: {
			toggle: function () {
				if (this.isFolder) {
					this.open = !this.open
				}
			},
			changeType: function () {
				if (!this.isFolder) {
					this.$set(this.model, 'children', [])
					this.addChild()
					this.open = true
				}
			},
			addChild: function () {
				this.model.children.push({
					name: 'new stuff'
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	/* CSS */
</style>
