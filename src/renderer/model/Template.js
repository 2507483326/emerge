import uuid from 'uuid'
export default class Template {
	constructor ({
		folderId = null,
		name = '',
		outPath = '',
		content = '',
		language = 'art'
	}) {
		this.id = uuid.v1()
		this.folderId = folderId
		this.name = name
		this.outPath = outPath
		this.content = content
		this.language = language
	}
}
