import PrimaryKey from "./PrimaryKey"
import Column from "./Column"

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
		data.primaryKeyList.forEach(item => {
			this.primaryKeyList.push(new PrimaryKey(item))
		})
		data.columnVoList.forEach(item => {
			this.columnVoList.push(new Column(item))
		})
	}
}
