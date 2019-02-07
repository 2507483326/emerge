import FolderMenu from "./FolderMenu"

export default class Template extends FolderMenu {

	constructor ({
		id = null,
		folderId = null,
		children = [],
		name = "",
		isFolder = false,
		path = '',
		generateName = '',
		language = 'artHtml'
	}) {
		super({id, folderId, children, name, isFolder, path})
		this.generateName = generateName
		this.language = language
	}

}
