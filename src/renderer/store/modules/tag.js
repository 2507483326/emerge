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
			const index = state.customTagList.findIndex(item => {
				return item.name === tag.name || item.key === tag.key || tag.name === '主键' || tag.name === '不为空' || tag.name === '数值' || tag.name === '文本' || tag.name === '日期'
			})
			if (index < 0) {
				commit('ADD_NEW_CUSTOM_TAG', tag)
				resolve()
			}
			reject(new Error('重复的自定义标签!'))
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
