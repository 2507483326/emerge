export default class GlobalParamsVo {
	constructor ({
		id = 0,
		name ='',
		value = '',
		type = 0
	}) {
		this.id = id
		this.name = name
		this.value = value
		this.type = type
	}
}
