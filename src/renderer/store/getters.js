import UUID from "uuid-js"
import { DbMenu } from '@/model'
import clone from 'clone'
const getters = {
	saveJson: state => {
		let saveObj = {}
		let saveDbList = clone(state.db.dbList).map(item => {
			item.isConnect = false
			item.children = []
			return item
		})
		saveObj.dbList = saveDbList
		saveObj.filterList = clone(state.filter.filterList).map(item => {
			if (item.id == 0) {
				item.name = ''
				item.value = ''
			}
			item.isShow = false
			return item
		})
		saveObj.templateList = state.template.templateList
		return saveObj
	},
	menuList: state => {
		let dbList = clone(state.db.dbList)
		let menuList = dbList.map(item => {
			let dbId = item.id
			let tableVo = state.db.tableList.find(item => {
				return item.id === dbId
			})
			if (tableVo && item.isConnect) {
				tableVo.tableList.forEach(tableItem => {
					item.children.push(new DbMenu({
						id: UUID.create().toString(),
						dbId: dbId,
						name: tableItem.tableName
					}))
				})
			}
			return item
		})
		return menuList
	},
	getDbById: state => id => {
		return state.db.dbList.find(item => {
			return item.id === id
		})
	},
	tableDetail: state => data => {
		let tableListVo = state.db.tableList.find(item => {
			return item.id === data.dbId
		})
		return tableListVo.tableList.find(item => {
			return item.tableName === data.name
		})
	},
	templateTree: state => {
		let templateListVo = clone(state.template.templateList)
		return templateListVo
	},
	templateDetail: state => data => {
		let templateListVo = state.template.templateList.find(item => {
			return item.id === data.folderId
		})
		return templateListVo.children.find(item => {
			return item.id === data.id
		})
	},
	filterList: state => clone(state.filter.filterList),
	tableDbTree: state => {
		let dbList = clone(state.db.dbList)
		return dbList
	},
	tableTree: state => dbId => {
		let resultList = []
		let tableListVo = state.db.tableList.find(item => {
			return item.id === dbId
		})
		if (!tableListVo) return []
		for (let i = 0; i < tableListVo.tableList.length; i++) {
			let item = tableListVo.tableList[i]
			resultList.push(new DbMenu({
				id: UUID.create().toString(),
				name: item.tableName,
				dbId: dbId
			}))
		}
		return resultList
	}
}
export default getters
