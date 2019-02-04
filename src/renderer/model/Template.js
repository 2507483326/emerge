import FolderMenu from "./FolderMenu"

export default class Template extends FolderMenu {

	constructor ({
		id = null,
		folderId = null,
		children = [],
		name = "",
		isFolder = false,
		path = '',
		generateName = ''
	}) {
		super({id, folderId, children, name, isFolder, path})
		this.generateName = generateName
	}

}
