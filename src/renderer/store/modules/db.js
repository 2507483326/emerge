import { Menu, TableVo, Table } from '@/model'
import UUID from 'uuid-js'
import fs from 'fs-extra'
const state = {
	dbList: [],
	tableList: []
}

const mutations = {
	ADD_DB (state, db) {
		state.dbList.push(db)
	},
	SET_DB_LIST (state, dbList) {
		state.dbList = dbList
	},
	CHANGE_DB (state, data) {
		let dbVo = state.dbList.find(item => {
			return item.id === data.dbId
		})
		if (dbVo) {
			dbVo.isConnect = data.flag
		}
	},
	DELETE_DB (state, dbId) {
		state.dbList = state.dbList.filter(item => {
			return item.id !== dbId
		})
	},
	ADD_TABLE (state, tableList) {
		let originTableList = state.tableList.filter(item => {
			return item.id !== tableList.id
		})
		originTableList.push(tableList)
		state.tableList = originTableList
	}
}

const actions = {
	addDb ({ getters, commit }, sqlConnectConfig) {
		let db = new Menu({
			id: UUID.create().toString(),
			name: `${sqlConnectConfig.name} (${sqlConnectConfig.mysqlDB})`,
			isDbLibrary: true,
			connectConfig: sqlConnectConfig
		})
		commit('ADD_DB', db)
		// 将新的dbList存储到文件
		fs.ensureFileSync('./userData/default.json')
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	},
	initDb ({ state, commit }) {
		try {
			fs.ensureFileSync('./userData/default.json')
			let oldData = fs.readJsonSync('./userData/default.json')
			if (oldData && oldData.dbList) {
				commit('SET_DB_LIST', oldData.dbList)
			}
		} catch (e) {
			console.warn('default.json解析失败')
		}
	},
	addTable ({ state, commit }, data) {
		let tableList = []
		data.data.dbVo.tableVoList.forEach(item => {
			tableList.push(new Table(item))
		})
		let tableListVo = new TableVo({
			id: data.id,
			tableList: tableList
		})
		commit('ADD_TABLE', tableListVo)
		commit('CHANGE_DB', {dbId: data.id, flag: true})
	},
	closeConnect ({ commit }, dbId) {
		commit('CHANGE_DB', {dbId, flag: false})
	},
	deleteDb ({ getters, commit }, dbId) {
		commit('DELETE_DB', dbId)
		fs.ensureFileSync('./userData/default.json')
		fs.writeJsonSync('./userData/default.json', getters.saveJson)
	}
}

export default {
	state,
	mutations,
	actions
}
