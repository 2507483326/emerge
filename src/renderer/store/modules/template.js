import UUID from 'uuid-js'
import { FolderMenu } from '@/model'
import fs from 'fs-extra'
const state = {
	templateList: []
}

const mutations = {
	SET_TEMPLATE_LIST (state, data) {
		state.templateList = data
	},
	ADD_TEMPLATE_FOLDER (state, data) {
		state.templateList.push(data)
	}
}

const actions = {
	addTemplateFolder ({ getters, commit }, data) {
		fs.ensureDirSync(data.path)
		commit('ADD_TEMPLATE_FOLDER', new FolderMenu({
			id: UUID,
			name: data.name,
			path: data.path
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
	}
}

export default {
	state,
	mutations,
	actions
}
