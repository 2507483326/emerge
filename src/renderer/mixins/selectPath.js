const { dialog } = require('electron').remote
export default {
	methods: {
		selectDirectoryPath (title) {
			return new Promise(resolve => {
				dialog.showOpenDialog({
					title: title,
					properties: ['openDirectory']
				}, (filePaths) => {
					if (filePaths) {
						resolve(filePaths[0])
					}
					resolve(null)
				})
			})
		},

	}
}
