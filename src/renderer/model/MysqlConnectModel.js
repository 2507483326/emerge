export default class MysqlConnectModel {
	constructor ({
		dataBase = null,
		userName = null,
		password = null,
		options = null,
		host = null,
		port = null,
		dialect = 'mysql',
		directory = false
	}) {
		this.dataBase = dataBase
		this.userName = userName
		this.password = password
		if (options == null || options === '') {
			this.options = {}
			this.options.host = host
			this.options.port = port
			this.options.dialect = dialect
			this.options.directory = directory
		} else {
			this.options = options
		}
	}
}
