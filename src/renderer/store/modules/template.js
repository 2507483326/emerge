const state = {
	templateList: [],
	templateFolderList: []
}

const mutations = {
	ADD_TEMPLATE_FOLDER (state, templateFolder) {
		state.templateFolderList.push(templateFolder)
	},
	REMOVE_TEMPLATE_FOLDER (state, id) {
		const index = state.templateFolderList.findIndex(item => {
			return item.id === id
		})
		if (index >=0) {
			state.templateFolderList.splice(index, 1)
		}
		state.templateList = state.templateList.filter(item => {
			return item.folderId !== id
		})
	},
	ADD_TEMPLATE (state, template) {
		state.templateList.push(template)
	},
	REMOVE_TEMPLATE (state, id) {
		const index = state.templateList.findIndex(item => {
			return item.id === id
		})
		if (index >=0) {
			state.templateList.splice(index, 1)
		}
	},
	UPDATE_TEMPLATE (state, template) {
		const index = state.templateList.findIndex(item => {
			return item.id === template.id
		})
		const oldTemplate = state.templateList[index]
		oldTemplate.content = template.content
		oldTemplate.language = template.language
		oldTemplate.outPath = template.outPath
	}
}

const actions = {
	addTemplateFolder ({ state, commit }, templateFolder) {
		return new Promise((resolve, reject) => {
			const index = state.templateFolderList.findIndex(item => {
				return item.name === templateFolder.name
			})
			if (index < 0) {
				commit('ADD_TEMPLATE_FOLDER', templateFolder)
				resolve()
			}
			reject('当前模板组已存在, 请勿重复添加!')
		})
	},
	removeTemplateFolder ({ commit }, id) {
		commit('REMOVE_TEMPLATE_FOLDER', id)
	},
	addTemplate ({ state, commit }, template) {
		return new Promise((resolve, reject) => {
			const index = state.templateList.findIndex(item => {
				return item.name === template.name && item.folderId === template.folderId
			})
			if (index < 0) {
				commit('ADD_TEMPLATE', template)
				resolve()
			}
			reject('当前模板已存在, 请勿重复添加!')
		})
	},
	removeTemplate ({ commit }, id) {
		commit('REMOVE_TEMPLATE', id)
	},
	updateTemplate ({ commit }, template) {
		commit('UPDATE_TEMPLATE', template)
	}
}

export default {
	state,
	mutations,
	actions
}
