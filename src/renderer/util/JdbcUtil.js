const Sequelize = require('sequelize')
import Table from '@/model/Table'

/**
 * 测试连接
 * @param mysqlConnectModel
 * @returns {Promise<any>}
 */
export function testConnect(mysqlConnectModel) {
	const connect = new Sequelize(mysqlConnectModel.dataBase, mysqlConnectModel.userName, mysqlConnectModel.password, mysqlConnectModel.options)
	return new Promise((resolve, reject) => {
		connect.authenticate().then(() => {
			resolve()
		}).catch(err => {
			reject(err)
		}).finally(() => {
			connect.close()
		})
	})
}

/**
 * 获取数据库表对象
 * @param db
 * @param mysqlConnectModel
 * @returns {Promise<unknown>}
 */
export function getTableByMysql (db, mysqlConnectModel) {
	const connect = new Sequelize(mysqlConnectModel.dataBase, mysqlConnectModel.userName, mysqlConnectModel.password, mysqlConnectModel.options)
	return new Promise((resolve, reject) => {
		connect.authenticate().then(() => {
			const SHOW_TABLE_QUERY = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + mysqlConnectModel.dataBase + "' AND table_type LIKE '%TABLE' AND table_name != 'spatial_ref_sys';";
			return connect.query(SHOW_TABLE_QUERY, {
				raw: true,
				type: connect.QueryTypes.SHOWTABLES
			})
		}).then((tableList) => {
			const handlerList = []
			tableList.forEach(tableName => {
				handlerList.push(getColumnHandler(db, connect, mysqlConnectModel.dataBase, tableName))
			})
			return handlerList
		}).then(handlerList => {
			Promise.all(handlerList).then(tableColumnList => {
				resolve(tableColumnList)
			})
		}).catch(err => {
			reject(err)
		}).finally(() => {
			connect.close()
		})
	})
}

/**
 * 获取字段
 * @param connect
 * @param dateBase
 * @param tableName
 * @returns {Promise<any>}
 */
function getColumnHandler (db, connect, dateBase, tableName) {
	const SHOW_COLUMN_QUERY = "SELECT COLUMN_KEY AS columnKey, COLUMN_COMMENT AS remark, COLUMN_NAME AS columnName, IS_NULLABLE AS isNull, DATA_TYPE AS type FROM `information_schema`.`COLUMNS` WHERE `TABLE_SCHEMA` = '" + dateBase + "' AND `TABLE_NAME` = '" + tableName + "';"
	return new Promise((resolve, reject) => {
		connect.query(SHOW_COLUMN_QUERY, {
			type: connect.QueryTypes.SELECT,
			raw: true
		}).then(columnList => {
			const table = new Table(db, tableName, columnList)
			resolve(table)
		}).catch(err => {
			reject(err)
		})
	})
}
