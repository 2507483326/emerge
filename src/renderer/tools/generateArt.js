import artTemplate from 'art-template'
import fs from 'fs-extra'
export function genTemplateToFile (generateDataList, generateConfigObj) {
	let templateList = []
	generateConfigObj.templateList.forEach(item => {
		let templateFile = fs.readFileSync(item.path) + ""
		templateList.push(artTemplate.compile(templateFile))
	})
	generateDataList.forEach(data => {
		templateList.forEach(templateItem => {
			console.log(templateItem)
			let reuslt= templateItem(data)
			console.log(reuslt)
		})
	})
}
