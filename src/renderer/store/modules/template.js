import UUID from 'uuid-js'
import { FolderMenu, Template, GlobalParamsVo } from '@/model'
import fs from 'fs-extra'
import clone from 'clone'
const state = {
	templateList: [],
	globalParamsList: [
	]
}

const mutations = {
	SET_TEMPLATE_LIST (state, data) {
		state.templateList = data
	},
	ADD_TEMPLATE_FOLDER (state, data) {
		state.templateList.push(data)
	},
	ADD_TEMPLATE (state, data) {
		console.log(data)
		let templateList = state.templateList.find(item => {
			return item.id === data.folderId
		})
		templateList.children.push(data.data)
		console.log(state)
	},
	CHANGE_TEMPLATE (state, data) {
		let templateList = state.templateList.find(item => {
			return item.id === data.folderId
		})
		let template = templateList.children.find(item => {
			return item.id === data.id
		})
		template[data.key] = data.value
	},
	DELETE_TEMPLATE (state, id) {
		let templateList = clone(state.templateList)
		templateList = templateList.map(item => {
			item.children = item.children.filter(childItem => {
				return childItem.id !== id
			})
			return item
		})
		templateList = templateList.filter(item => {
			return item.id !== id
		})
		state.templateList = templateList
	},
	ADD_GLOBAL_PARAMS (state, data) {
		state.globalParamsList.unshift(data)
	},
	SET_GLOBAL_PARAMS (state, data) {
		state.globalParamsList = data
	},
	UPDATE_GLOBAL_PARAMS (state, data) {
		let originGlobalParams = state.globalParamsList.find(item => {
			return item.id === data.id
		})
		originGlobalParams.name = data.name
		originGlobalParams.value = data.value
		originGlobalParams.type = data.type
		originGlobalParams.isShow = data.isShow
	},
	DELETE_GLOBAL_PARAMS (state, id) {
		state.globalParamsList = state.globalParamsList.filter(item => {
			return item.id !== id
		})
	}
}

const actions = {
	addTemplateFolder ({ getters, commit }, data) {
		fs.ensureDirSync(data.path)
		commit('ADD_TEMPLATE_FOLDER', new FolderMenu({
			id: UUID.create().toString(),
			name: data.name,
			path: data.path,
			isFolder: true
		}))
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	},
	addExistsTemplate ({ dispatch }, data) {
		let folder = state.templateList.find(item => {
			return item.id === data.folderId
		})
		let filePath = `${folder.path}\\${data.name}.art`
		fs.copy(data.file.path, filePath)
		dispatch('addTemplate', data)
	},
	addTemplate ({ getters, state, commit }, data) {
		let folder = state.templateList.find(item => {
			return item.id === data.folderId
		})
		let filePath = `${folder.path}\\${data.name}.art`
		fs.ensureFileSync(filePath)
		commit('ADD_TEMPLATE', {
			folderId: data.folderId,
			data: new Template({
				id: UUID.create().toString(),
				folderId: data.folderId,
				name: data.name,
				path: filePath
			})
		})
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	},
	initTemplate ({ state, commit }) {
		try {
			fs.ensureFileSync('./userData/default.json')
			let oldData = fs.readJsonSync('./userData/default.json')
			if (oldData && oldData.templateList) {
				commit('SET_TEMPLATE_LIST', oldData.templateList)
			}
		} catch (e) {
			console.warn('default.json解析失败')
		}
	},
	deleteTemplateFolder ({ getters, commit }, id) {
		commit('DELETE_TEMPLATE', id)
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	},
	deleteTemplate ({ getters, commit }, id) {
		commit('DELETE_TEMPLATE', id)
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	},
	changeTemplate ({ getters, commit }, data) {
		commit('CHANGE_TEMPLATE', data)
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	},
	addGlobalParams ({ getters, commit }, data) {
		commit('ADD_GLOBAL_PARAMS', new GlobalParamsVo({
			id: UUID.create().toString(),
			type: data.type,
			name: data.name,
			value: data.value
		}))
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	},
	updateGlobalParams ({ getters, commit }, data) {
		commit('UPDATE_GLOBAL_PARAMS', new GlobalParamsVo({
			id: data.id,
			type: data.type,
			name: data.name,
			value: data.value
		}))
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	},
	deleteGlobalParams ({ getters, commit }, data) {
		commit('DELETE_GLOBAL_PARAMS', data.id)
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	},
	initGlobalParams ({ commit }) {
		try {
			fs.ensureFileSync('./userData/default.json')
			let oldData = fs.readJsonSync('./userData/default.json')
			if (oldData && oldData.globalParamsList) {
				commit('SET_GLOBAL_PARAMS', oldData.globalParamsList)
			}
		} catch (e) {
			console.warn('default.json解析失败')
		}
	}
}

export default {
	state,
	mutations,
	actions
}
