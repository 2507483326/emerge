import UUID from 'uuid-js'
import { FolderMenu } from '@/model'
import fs from 'fs-extra'
import clone from 'clone'
const state = {
	templateList: []
}

const mutations = {
	SET_TEMPLATE_LIST (state, data) {
		state.templateList = data
	},
	ADD_TEMPLATE_FOLDER (state, data) {
		state.templateList.push(data)
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
	deleteTemplate ({ getters, commit }, id) {
		commit('DELETE_TEMPLATE', id)
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	}
}

export default {
	state,
	mutations,
	actions
}
