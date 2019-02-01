export default class DbMenu {

	constructor ({
		id = null,
		dbId = null,
		folderId = null,
		children = [],
		name = "",
		isDbLibrary = false,
		isFolder = false,
		isConnect = false,
		path = null,
		connectConfig = null
	}) {
		this.id = id
		this.dbId = dbId
		this.folderId = folderId
		this.children = children
		this.name = name
		this.isDbLibrary = isDbLibrary
		this.isFolder = isFolder
		this.isConnect = isConnect
		this.path = path
		this.connectConfig = connectConfig
	}

}
