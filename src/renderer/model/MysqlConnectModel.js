export default class MysqlConnectModel {
	constructor ({
		dataBase = null,
		userName = null,
		password = null,
		host = null,
		port = null,
		dialect = 'mysql',
		directory = false
	}) {
		this.dataBase = dataBase
		this.userName = userName
		this.password = password
		this.options = {}
		this.options.port = port
		this.options.dialect = dialect
		this.options.directory = directory
	}
}
