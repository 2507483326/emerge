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
				state.pathList.shift()
			}
			state.pathList.push(path)
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
