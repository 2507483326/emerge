import { DEFAULT_TAG_LIST } from '@/util/DefaultTagUtil'
const state = {
	customTagList: []
}

const mutations = {
	ADD_NEW_CUSTOM_TAG (state, tag) {
		state.customTagList.push(tag)
	},
	REMOVE_CUSTOM_TAG (state, tagId) {
		const index = state.customTagList.findIndex(item => {
			return item.id === tagId
		})
		if (index >= 0) {
			state.customTagList.splice(index, 1)
		}
	}
}

const actions = {
	addNewCustomTag ({state, commit }, tag) {
		return new Promise((resolve, reject) => {
			let index = state.customTagList.findIndex(item => {
				return item.name === tag.name || item.key === tag.key
			})
			if (index >= 0) {
				reject(new Error('重复的自定义标签!'))
				return
			}
			index = DEFAULT_TAG_LIST.findIndex(item => {
				return item.name === tag.name || item.key === tag.key
			})
			if (index >= 0) {
				reject(new Error('自定义标签和默认的标签冲突!'))
				return
			}
			commit('ADD_NEW_CUSTOM_TAG', tag)
			resolve()
		})
	},
	removeCustomTag ({ commit}, tagId) {
		commit('REMOVE_CUSTOM_TAG', tagId)
	}
}

export default {
	state,
	mutations,
	actions
}
