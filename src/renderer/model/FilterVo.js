export default class FilterVo {
	constructor ({
		id = 0,
		name ='',
		value = '',
		isShow = false
	}) {
		this.id = id
		this.name = name
		this.value = value
		this.isShow = isShow
	}
}
