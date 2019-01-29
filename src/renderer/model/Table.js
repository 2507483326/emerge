export default class Table {
	tableName = ""
	tableType = ""
	talbleRemarks = ""
	lowerCaseTableName = ""
	primaryKeyList = []
	columnVoList = []

	constructor (data) {
		this.tableName = data.tableName
		this.tableType = data.tableType
		this.talbleRemarks = data.talbleRemarks
		this.lowerCaseTableName = data.lowerCaseTableName
	}
}
