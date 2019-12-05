import db from "./modules/db";

const getters = {
	templateTree: (state) => {
		const templateFolderList = JSON.parse(JSON.stringify(state.template.templateFolderList))
		const templateList = JSON.parse(JSON.stringify(state.template.templateList))
		templateFolderList.forEach(item => {
			item.title = item.name
			item.children = []
			templateList.forEach(template => {
				template.title = template.name
				if (template.folderId === item.id) {
					item.children.push(template)
				}
			})
		})
		return templateFolderList.filter(item => {
			return item.children.length > 0
		})
	},
	tableTree: (state) => {
		const dbList = JSON.parse(JSON.stringify(state.db.dbList))
		const dbTableMap = JSON.parse(JSON.stringify(state.db.dbTableMap))
		dbList.forEach(item => {
			console.log(item)
			item.title = item.name
			item.children = dbTableMap[item.id] ? dbTableMap[item.id].map(table => {
				table.title = table.lowerCaseTableName
				return table
			}) : []
		})
		console.log(dbList)
		return dbList.filter(item => {
			return item.children.length > 0
		})
	}
}

export default getters
