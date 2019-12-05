const state = {
	dbList: [],
	dbTableMap: {},
	tableExtendTagList: []
}

const mutations = {
	ADD_DB (state, db) {
		state.dbList.push(db)
	},
	REMOVE_DB (state, dbId) {
		const index = state.dbList.findIndex(item => {
			return item.id === dbId
		})
		if (index >= 0) {
			state.dbList.splice(index, 1)
		}
		state.dbTableMap[dbId] = null
		const deleteTableCustomList = []
		state.tableExtendTagList.forEach((item, index) => {
			if (item.dbId === dbId) {
				deleteTableCustomList.push(index)
			}
		})
		deleteTableCustomList.forEach(delteIndex => {
			state.tableExtendTagList.splice(delteIndex, 1)
		})
	},
	ADD_DB_TABLE_LIST (state, tableListModel) {
		window.globbalVue.$set(state.dbTableMap, tableListModel.dbId, [])
		state.dbTableMap[tableListModel.dbId].push(...tableListModel.tableList)
	},
	ADD_TABLE_CUSTOM_TAG (state, customTagObj) {
		state.tableExtendTagList.push(customTagObj)
	},
	REMOVE_TABLE_CUSTOM_TAG (state, customTagId) {
		const index = state.tableExtendTagList.findIndex(item => {
			return item.id === customTagId
		})
		if (index >= 0) {
			state.tableExtendTagList.splice(index, 1)
		}
	}
}

const actions = {
	addDb ({ state, commit }, db) {
		return new Promise((resolve, reject) => {
			const index = state.dbList.findIndex(item => {
				console.log(item)
				return item.name === db.name
			})
			if (index < 0) {
				commit('ADD_DB', db)
				resolve()
			}
			reject(new Error('重复的数据库连接名称!'))
		})
	},
	addDbTableList ({ state, commit }, dbTableModel) {
		commit('ADD_DB_TABLE_LIST', {
			dbId: dbTableModel.id,
			tableList: dbTableModel.tableList
		})
	},
	removeDb ({ commit }, dbId) {
		commit('REMOVE_DB', dbId)
	},
	addTableCustomTag ({ state, commit }, customTagObj) {
		return new Promise((resolve, reject) => {
			const index = state.tableExtendTagList.findIndex(item => {
				return item.dbId === customTagObj.dbId && item.tableId === customTagObj.tableId && item.columnId === customTagObj.columnId && item.name === customTagObj.name
			})
			if (index < 0) {
				commit('ADD_TABLE_CUSTOM_TAG', customTagObj)
				resolve()
			}
			reject('当前标签已存在, 请勿重复添加!')
		})
	},
	removeTableCustomTag ({ commit }, customTagId) {
		commit('REMOVE_TABLE_CUSTOM_TAG', customTagId)
	}
}


export default {
	state,
	mutations,
	actions
}
