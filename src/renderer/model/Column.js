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
		this.nullAble = nullAble === 1 || isPrimaryKey
		this.remarks = remarks
		this.columnDef = columnDef
		this.charOctetLength = charOctetLength
		this.ordinalPosition = ordinalPosition
		this.isNullable = isNullable === 1 || isPrimaryKey
		this.scourceDataType = scourceDataType
		// 是否自动递增
		this.isAutoIncrement = isAutoIncrement !== 'NO'
		this.columnName = columnName
		this.lowerCaseUnderLineColumnName = lowerCaseUnderLineColumnName
		this.upperCaseUnderLineColumnName = upperCaseUnderLineColumnName
		this.camelColumnName = camelColumnName
		// java 数据类型
		this.javaType = javaType
		this.oracleType = oracleType
		this.mysqlType = mysqlType
		this.sqlServerType = sqlServerType
		this.pgsqlType = pgsqlType
		this.isPrimaryKey = isPrimaryKey
	}

}
