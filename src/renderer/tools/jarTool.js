import iconv from 'iconv-lite'
import { exec as childExec } from 'child_process'
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
		childExec(execPath, { encoding: 'buffer' }, (error, stdout) => {
			try {
				if (error) {
					reject({
						flag: false,
						msg: error
					})
					return
				}
				let execResult = iconv.decode(stdout, 'cp936')
				let resultObj = JSON.parse(execResult)
				if (resultObj.flag) {
					resolve(resultObj.data)
				} else {
					reject(resultObj)
				}
			} catch (e) {
				reject(e)
			}
		})
	})
}

export default {
	exec
}
