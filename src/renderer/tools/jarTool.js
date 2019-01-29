let childExec = require('child_process').exec

/**
 * 执行jar包
 * @param cmdId 请求命令
 * @param cmdData 请求数据
 * @returns {Promise<any>}
 */
export function exec (cmdId, cmdData) {
	return new Promise((resolve, reject) => {
		let objBuffer = Buffer.from(JSON.stringify(cmdData))
		let objBase64 = objBuffer.toString('base64')
		let execPath = `java -jar static/jar/qing-dbcovert-1.00-jar-with-dependencies.jar ${cmdId} ${objBase64}`
		childExec(execPath, (error, stdout) => {
			if (error) {
				reject({
					flag: false,
					msg: error
				})
				return
			}
			let execResult = stdout
			let resultObj = JSON.parse(execResult)
			if (resultObj.flag) {
				resolve(resultObj.data)
			} else {
				reject(resultObj)
			}
		})
	})
}

export default {
	exec
}
