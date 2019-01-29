export default class SqlConnect {

	mysqlUrl = ""

	constructor (name = "", mysqlHost = "", mysqlPort = null, mysqlDB = "", mysqlUrlParam = "", mysqlUser = "", mysqlPassword = "") {
		this.name = name
		this.mysqlHost = mysqlHost
		this.mysqlPort = mysqlPort
		this.mysqlDB = mysqlDB
		this.mysqlUrlParam = mysqlUrlParam
		this.mysqlUser = mysqlUser
		this.mysqlPassword = mysqlPassword
	}

	// 组装URL
	groupMysqlUrl () {
		this.mysqlUrl = `jdbc:mysql://${this.mysqlHost}:${this.mysqlPort}/`
	}
}
