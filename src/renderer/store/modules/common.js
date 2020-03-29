const state = {
	enablePrettierPath: false,
	prettierPath: null
}

const mutations = {
	SET_PRETTIER_PATH (state, prettierPath) {
		state.prettierPath = prettierPath
	},
	SET_ENABLE_PRETTIER_PATH (state, enable) {
		state.enablePrettierPath = enable
	}
}

const actions = {
	setPrettierPath ({ state, commit }, prettierPath) {
		commit('SET_PRETTIER_PATH', prettierPath)
	},
	setEnablePrettierPath ({ state, commit }, enable) {
		console.log(enable)
		commit('SET_ENABLE_PRETTIER_PATH', enable)
	}
}


export default {
	state,
	mutations,
	actions
}
