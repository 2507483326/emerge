import artTemplate from 'art-template'
import fs from 'fs-extra'
import { $const } from '@/common'
export function genTemplateToFile (_this, generateDataList, generateConfigObj, paramsArray) {
	console.log(paramsArray)
	paramsArray.forEach(item => {
		let paramsImport = artTemplate.defaults.imports
		// 动态方法
		if (item.type === 2) {
			eval(`${item.value}`)
		} else {
			eval(`paramsImport['${item.name}'] = ${item.value}`)
		}
	})
	// 渲染文件名称
	let renderName = ''
	generateConfigObj.templateList = generateConfigObj.templateList.map(item => {
		let templateFile = fs.readFileSync(item.path) + ""
		item.render = artTemplate.compile(templateFile)
		return item
	})
	generateDataList.forEach(data => {
		generateConfigObj.templateList.forEach(templateItem => {
			console.log(generateConfigObj)
			// 注册过滤器
			let generateData = data
			eval('renderName = `' + templateItem.generateName + '`')
			console.log(renderName)
			console.log(generateData)
			let renderTxt = templateItem.render(generateData)
			console.log(renderTxt)
			let renderPath = generateConfigObj.path + '\\' + renderName
			fs.ensureFileSync(renderPath)
			fs.writeFileSync(renderPath, renderTxt)
		})
	})
}


