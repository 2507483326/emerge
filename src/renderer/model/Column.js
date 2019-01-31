export default class Column {

	constructor ({tableCat = "", tableSchem = "", tableName = "", dataType = null, typeName = "", columnSize = null, decimalDigits = null,
				numPrecRadix = null, nullAble = null, remarks = "", columnDef = "", charOctetLength = null, ordinalPosition = null, isNullable = "",
				scourceDataType = null, isAutoIncrement = "", columnName = "", lowerCaseUnderLineColumnName = "", upperCaseUnderLineColumnName = "",
				camelColumnName = "", javaType = "", oracleType = "", mysqlType = "", sqlServerType = "", pgsqlType = "", isPrimaryKey = false}) {
		this.tableCat = tableCat
		this.tableSchem = tableSchem
		this.tableName = tableName
		this.dataType = dataType
		this.typeName = typeName
		this.columnSize = columnSize
		this.decimalDigits = decimalDigits
		this.numPrecRadix = numPrecRadix
		this.nullAble = nullAble
		this.remarks = remarks
		this.columnDef = columnDef
		this.charOctetLength = charOctetLength
		this.ordinalPosition = ordinalPosition
		this.isNullable = isNullable
		this.scourceDataType = scourceDataType
		this.isAutoIncrement = isAutoIncrement
		this.columnName = columnName
		this.lowerCaseUnderLineColumnName = lowerCaseUnderLineColumnName
		this.upperCaseUnderLineColumnName = upperCaseUnderLineColumnName
		this.camelColumnName = camelColumnName
		this.javaType = javaType
		this.oracleType = oracleType
		this.mysqlType = mysqlType
		this.sqlServerType = sqlServerType
		this.pgsqlType = pgsqlType
		this.isPrimaryKey = isPrimaryKey
	}
}
