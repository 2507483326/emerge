import uuid from 'uuid'
export default class TemplateFolder {
	constructor({
		name = ''
	}) {
		this.id = uuid.v1()
		this.name = name
	}
}
