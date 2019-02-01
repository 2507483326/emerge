export default class FolderMenu {

	constructor ({
		id = null,
		folderId = null,
		children = [],
		name = "",
		isFolder = false,
		path = ''
	}) {
		this.id = id
		this.folderId = folderId
		this.children = children
		this.name = name
		this.isFolder = isFolder
		this.path = path
	}

}
