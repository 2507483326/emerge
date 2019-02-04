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
	tableDetail: state => data => {
		let tableListVo = state.db.tableList.find(item => {
			return item.id === data.dbId
		})
		return tableListVo.tableList.find(item => {
			return item.id === data.id
		})
	},
	templateDetail: state => data => {
		let templateListVo = state.template.templateList.find(item => {
			return item.id === data.folderId
		})
		return templateListVo.children.find(item => {
			return item.id === data.id
		})
	}
}
export default getters
