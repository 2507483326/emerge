import uuid from 'uuid'
export default class TableCustomTag {
	constructor({
		dbId = null,
		tableId = null,
		columnId = null,
		name = '',
		key = '',
		color = 'default'
	}) {
		this.id = uuid.v1()
		this.dbId = dbId
		this.tableId = tableId
		this.columnId = columnId
		this.name = name
		this.key = key
		this.color = color
		this.closable = true
	}
}
