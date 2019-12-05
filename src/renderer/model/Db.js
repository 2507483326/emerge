import MySqlConnectModel from './MysqlConnectModel'
import uuid from 'uuid'
export default class Db {
	constructor (dbModel) {
		this.id = uuid.v1()
		this.name = dbModel.name
		this.mysqlConnectModel = new MySqlConnectModel(dbModel)
	}
}
