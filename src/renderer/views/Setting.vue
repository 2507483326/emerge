import path from "path";
<template>
	<div class="setting-box">
		<Card>
			<div class="list-item-box">
				<div class="title">
					<div>自定义prettier格式化配置</div>
					<i-switch v-model="enablePrettierPath" />
				</div>
				<div class="select-prettier-path-box" v-show="enablePrettierPath">
					<Input v-model="prettierPath" placeholder="请输入prettier格式化配置路径"></Input>
					<Button @click="selectPrettierPath">...</Button>
				</div>
			</div>
		</Card>
		<Card>
			<div class="list-item-box">
				<div class="title">透明度</div>
				<div>
					<Slider v-model="opacity" :min="10" />
				</div>
			</div>
		</Card>
	</div>
</template>

<script>
	import { remote } from 'electron'
	const { dialog } = require('electron').remote
	import path from 'path'
	export default {
		data () {
			return {
				opacity: 100
			}
		},
		computed: {
			enablePrettierPath: {
				get () {
					return this.$store.state.common.enablePrettierPath
				},
				set (val) {
					this.$store.dispatch('setEnablePrettierPath', val)
				}
			},
			prettierPath: {
				get () {
					return this.$store.state.common.prettierPath
				},
				set (val) {
					this.$store.dispatch('setPrettierPath', val)
				}
			}
		},
		mounted() {
			this.getOpacity()
		},
		watch: {
			opacity (newVal) {
				if (newVal > 10) {
					remote.getCurrentWindow().setOpacity(newVal / 100)
				}
			}
		},
		methods: {
			selectPrettierPath () {
				dialog.showOpenDialog({
					title: '选择prettier格式化配置路径',
					properties: ['openFile'],
					defaultPath: path.normalize('./.prettierrc'),
					filters: [
						{ name: 'prettierrc', extensions: ['prettierrc'] }
					]
				}, (filePaths) => {
					if (filePaths) {
						this.$store.dispatch('setPrettierPath', filePaths[0])
					}
				})
			},
			getOpacity () {
				this.opacity = remote.getCurrentWindow().getOpacity() * 100
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.setting-box
		padding 10px
		.ivu-card
			margin-bottom 10px
		.list-item-box
			flex 1
			.title
				width 100%
				display flex
				justify-content space-between
				margin-bottom 10px
				font-weight bold
				font-size 16px
			.select-prettier-path-box
				display flex
				>>> button
					margin-left 10px
</style>
