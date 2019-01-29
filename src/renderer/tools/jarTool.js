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
				reject(error)
				return
			}
			let execResult = stdout
			console.log('===================')
			console.log(execResult)
			console.log('===================')
			let resultObj = JSON.parse(execResult)
			resolve(resultObj)
		})
	})
}

export default {
	exec
}
