import UUID from "uuid-js"
import { Menu } from '@/model'
const getters = {
	menuList: state => {
		let dbList = JSON.parse(JSON.stringify(state.db.dbList))
		let menuList = dbList.map(item => {
			let dbId = item.id
			let tableVo = state.db.tableList.find(item => {
				return item.id === dbId
			})
			if (tableVo && item.isConnect) {
				tableVo.tableList.forEach(tableItem => {
					item.children.push(new Menu({
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
		let tableVo = state.db.tableList.find(item => {
			return item.id === data.dbId
		})
		console.log(data.tableName)
		let tableDetail = tableVo.tableList.find(item => {
			return item.tableName === data.tableName
		})
		return tableDetail
	}
}
export default getters
