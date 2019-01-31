import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
	modules,
	getters,
	strict: process.env.NODE_ENV !== 'production'
})
