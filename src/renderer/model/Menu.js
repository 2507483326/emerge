export default class Menu {

	constructor ({
		id = null,
		children = [],
		name = "",
		isDbLibrary = false,
		isConnect = false,
		connectConfig = null
	}) {
		this.id = id
		this.children = children
		this.name = name
		this.isDbLibrary = isDbLibrary
		this.isConnect = isConnect
		this.connectConfig = connectConfig
	}

}
