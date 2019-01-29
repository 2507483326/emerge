export default class PrimaryKey {
	constructor ({
				tableCat = '',
				tableSchem = '',
				tableName = '',
				columnName = '',
				keySeq = null,
				pkName = '',
				lowerCaseUnderLineColumnName = '',
				upperCaseUnderLineColumnName = '',
				camelColumnName = ''
	}) {
		this.tableCat = tableCat
		this.tableSchem = tableSchem
		this.tableName = tableName
		this.columnName = columnName
		this.keySeq = keySeq
		this.pkName = pkName
		this.lowerCaseUnderLineColumnName = lowerCaseUnderLineColumnName
		this.upperCaseUnderLineColumnName = upperCaseUnderLineColumnName
		this.camelColumnName = camelColumnName
	}

}
