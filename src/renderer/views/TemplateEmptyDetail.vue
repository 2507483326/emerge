<template>
	<div class="empty_box">
		<div class="upload_box" ref="uploadBox">
			<img :src="require('@/assets/upload.png')" />
			<div class="tip">拖拽文件到此处上传</div>
			<div class="mask" v-show="isDragFile"></div>
		</div>
		<new-template-file-modal ref="newTemplateFileModal"></new-template-file-modal>
	</div>
</template>

<script>
	import fs from 'fs-extra'
	import path from 'path'
	import NewTemplateFileModal from '@/components/template/NewTemplateFileModal'
	import TemplateFolder from '@/model/TemplateFolder'
	import Template from '@/model/Template'
	export default {
		data () {
			return {
				isDragFile: false
			}
		},
		components: {
			NewTemplateFileModal
		},
		mounted () {
			this.addEventListener()
		},
		beforeDestroy () {
			this.removeEventListener()
		},
		methods: {
			addEventListener () {
				document.addEventListener('drop', this.addExistsFile)
				document.addEventListener('dragenter', this.dragEnter)
				document.addEventListener('dragleave', this.dragLeave)
			},
			removeEventListener () {
				document.removeEventListener('drop', this.addExistsFile)
				document.removeEventListener('dragenter', this.dragEnter)
				document.removeEventListener('dragleave', this.dragLeave)
			},
			async addExistsFile (event) {
				event.preventDefault()
				event.stopPropagation()
				let file = event.dataTransfer.files[0]
				if (file == null) {
					this.$Message.warning('请选择文件!')
					return
				}
				try {
					const content = fs.readFileSync(file.path)
					if (path.extname(file.path) === '.art') {
						this.$refs.newTemplateFileModal.show(null, JSON.parse(content.toString()).content)
						return
					}
					if (path.extname(file.path) === '.artGroup') {
						const artGroup = JSON.parse(content.toString())
						const templateFolder = new TemplateFolder(artGroup)
						await this.$store.dispatch('addTemplateFolder', templateFolder)
						console.log(artGroup.list)
						if (artGroup.list) {
							artGroup.list.forEach(item => {
								let template = new Template(item)
								template.folderId = templateFolder.id
								console.log(template)
								this.$store.dispatch('addTemplate', template)
							})
						}
						this.$Message.success('导入文件成功!')
						return
					}
					this.$refs.newTemplateFileModal.show(null, content.toString())
				} catch (e) {
					this.$Message.error(e)
				}
			},
			dragEnter (event) {
				event.preventDefault()
				event.stopPropagation()
				const offsetTop = this.$refs.uploadBox.offsetTop
				const offsetLeft = this.$refs.uploadBox.offsetLeft
				const clientX = event.clientX
				const clientY = event.clientY
				if (clientX > offsetLeft && clientX < (offsetLeft + 400) && clientY > offsetTop && clientY < (offsetTop + 200)) {
					console.log(this)
					this.isDragFile = true
					console.log(this.isDragFile)
				} else {
					this.isDragFile = false
				}
			},
			dragLeave (event) {
				event.preventDefault()
				event.stopPropagation()
				// this.isDragFile = false
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.empty_box
		height 100%
		display flex
		justify-content center
		align-items center
		.upload_box
			display flex
			flex-direction column
			justify-content center
			align-items center
			width 400px
			height 200px
			border 1px dashed #2d8cf0
			position relative
			.mask
				position absolute
				top 0
				left 0
				height 100%
				width 100%
				background rgba(255, 255, 255, .3)
			img
				height 100px
</style>
