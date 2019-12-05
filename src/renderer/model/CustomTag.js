import uuid from 'uuid'
export default class CustomTag {
	constructor({
		name = '',
		key = '',
		color = 'default'
	}) {
		this.id = uuid.v1()
		this.name = name
		this.key = key
		this.color = color
	}
}
