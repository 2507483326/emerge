import { FilterVo } from '@/model'
import UUID from 'uuid-js'
import fs from 'fs-extra'
const state = {
	filterList: [
		new FilterVo({
			name: '',
			value: ''
		})
	]
}

const mutations = {
	ADD_FILTER (state, data) {
		state.filterList.unshift(data)
	},
	SET_FILTER (state, data) {
		state.filterList = data
	},
	UPDATE_FILTER (state, data) {
		let originFilter = state.filterList.find(item => {
			return item.id === data.id
		})
		originFilter.name = data.name
		originFilter.value = data.value
		originFilter.isShow = data.isShow
	},
	DELETE_FILTER (state, id) {
		state.filterList = state.filterList.filter(item => {
			return item.id !== id
		})
	},
	CHANGE_FILTER_SHOW (state, data) {
		let originFilter = state.filterList.find(item => {
			return item.id === data.id
		})
		originFilter.isShow = data.isShow
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
	updateFilter ({ getters, commit }, data) {
		commit('UPDATE_FILTER', new FilterVo({
			id: data.id,
			name: data.name,
			value: data.value
		}))
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	},
	deleteFilter ({ getters, commit }, data) {
		commit('DELETE_FILTER', data.id)
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	},
	changeFilterShow ({ commit }, data) {
		commit('CHANGE_FILTER_SHOW', new FilterVo({
			id: data.id,
			isShow: !data.isShow
		}))
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
