const state = {
	pathList: []
}

const mutations = {
	ADD_PATH (state, path) {
		let index = state.pathList.findIndex(item => {
			return item === path
		})
		if (index < 0) {
			if (state.pathList.length > 4) {
				state.pathList.pop()
			}
			state.pathList.unshift(path)
		} else {
			state.pathList.splice(index, 1)
			state.pathList.unshift(path)
		}
	}
}

const actions = {
	addPath ({ state, commit }, path) {
		commit('ADD_PATH', path)
	}
}


export default {
	state,
	mutations,
	actions
}
