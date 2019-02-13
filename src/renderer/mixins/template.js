export default {
	methods: {
		isHasTemplateName (name) {
			let templateList = this.$store.getters.templateList
			for (let i = 0; i < templateList.length; i++) {
				if (templateList[i].children.some(item => {
					return item.name === name
				})) {
					return true
				}
			}
			return false
		}
	}
}
