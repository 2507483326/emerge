<template>
	<div class="menu_list_box">
		<template-file-list @selectTemplateFile="selectTemplateFile" @addTemplateFile="addTemplateFile"></template-file-list>
	</div>
</template>

<script>
	import TemplateFileList from './TemplateFileList'
	export default {
		components: {
			TemplateFileList
		},
		methods: {
			selectTemplateFile (templateModel) {
				this.$emit('selectTemplateFile', templateModel)
			},
			addTemplateFile (templateFolderModel) {
				this.$emit('addTemplateFile', templateFolderModel)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.menu_list_box
		height 100%
		overflow-y auto
</style>
