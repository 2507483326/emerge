import { Menu } from '@/model'
import UUID from 'uuid-js'
import fs from 'fs-extra'
const state = {
	dbList: []
}

const mutations = {
	ADD_DB (state, db) {
		state.dbList.push(db)
	},
	SET_DB_LIST (state, dbList) {
		state.dbList = dbList
	}
}

const actions = {
	addDb ({ state, commit }, sqlConnectConfig) {
		console.log('新增db')
		let db = new Menu({
			id: UUID.create().toString(),
			name: sqlConnectConfig.name,
			isDbLibrary: true,
			connectConfig: sqlConnectConfig
		})
		commit('ADD_DB', db)
		// 将新的dbList存储到文件
		fs.ensureFileSync('./userData/default.json')
		fs.writeJsonSync('./userData/default.json', state)
	},
	initDb ({ state, commit }) {
		fs.ensureFileSync('./userData/default.json')
		let oldData = fs.readJsonSync('./userData/default.json')
		if (oldData && oldData.dbList) {
			commit('SET_DB_LIST', oldData.dbList)
		}
	}
}

export default {
	state,
	mutations,
	actions
}
