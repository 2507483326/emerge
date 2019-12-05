import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import fs from 'fs-extra'
const FILE_PATH = './/userData//default.json'
import getters from './getters'
import modules from './modules'
Vue.use(Vuex)


export default new Vuex.Store({
	modules,
	getters,
	strict: process.env.NODE_ENV !== 'production',
	plugins: [
		createPersistedState({
			storage: {
				getItem: key => {
					fs.ensureFileSync(FILE_PATH)
					let oldData = {}
					try {
						oldData = fs.readJsonSync(FILE_PATH)
					} catch (e) {
						console.warn('读取文件失败')
					}
					return oldData[key]
				},
				setItem: (key, value) => {
					fs.ensureFileSync(FILE_PATH)
					let oldData = {}
					try {
						oldData = fs.readJsonSync(FILE_PATH)
					} catch (e) {
						console.warn('读取文件失败')
					}
					oldData[key] = value
					fs.writeJsonSync(FILE_PATH, oldData)
				},
				removeItem: key => {
					fs.ensureFileSync(FILE_PATH)
					let oldData = {}
					try {
						oldData = fs.readJsonSync(FILE_PATH)
					} catch (e) {
						console.warn('读取文件失败')
					}
					delete oldData[key]
					fs.writeJsonSync(FILE_PATH, oldData)
				}
			}
		})
	]
})
