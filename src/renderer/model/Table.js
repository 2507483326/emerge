import Column from './Column'
import uuid from 'uuid'
export default class Table {
	constructor (db, tableName, fields) {
		this.tableId = db.id + '-' + tableName
		this.tableName = tableName
		this.className = this.tableName.replace(/\_(\w)/g, function(all, letter){
			return letter.toUpperCase();
		})
		this.className = this.className.charAt(0).toUpperCase() + this.className.slice(1)
		this.lowerCaseTableName = this.className.charAt(0).toLowerCase() + this.className.slice(1)
		this.columns = []
		for (let fieldName in fields) {
			let fieldObj = fields[fieldName]
			fieldObj.name = fieldName
			this.columns.push(new Column(this.tableId, fieldObj))
		}
	}
}
