import { FilterVo } from '@/model'
import UUID from 'uuid-js'
const state = {
	filterList: []
}

const mutations = {
	ADD_FILTER (state, data) {
		state.filterList.unshift(data)
	},
	SET_FILTER (state, data) {
		state.filterList = data
	}
}

const actions = {
	addFilter ({ getters, commit }, data) {
		commit('ADD_FILTER', new FilterVo({
			id: UUID.create().toString(),
			name: data.name,
			value: data.value
		}))
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	},
	initFilter ({ commit }) {
		try {
			fs.ensureFileSync('./userData/default.json')
			let oldData = fs.readJsonSync('./userData/default.json')
			if (oldData && oldData.filterList) {
				commit('SET_FILTER', oldData.filterList)
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
