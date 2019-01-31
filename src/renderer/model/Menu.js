export default class Menu {

	constructor ({
		id = null,
		dbId = null,
		children = [],
		name = "",
		isDbLibrary = false,
		isConnect = false,
		connectConfig = null
	}) {
		this.id = id
		this.dbId = dbId
		this.children = children
		this.name = name
		this.isDbLibrary = isDbLibrary
		this.isConnect = isConnect
		this.connectConfig = connectConfig
	}

}
