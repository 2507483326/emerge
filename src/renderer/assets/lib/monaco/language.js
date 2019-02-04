import {registerLanguage} from 'monaco-editor/esm/vs/basic-languages/_.contribution.js'

// eslint-disable-next-line
var _monaco = (typeof monaco === 'undefined' ? self.monaco : monaco)
registerLanguage({
	id: 'bat',
	extensions: ['.bat', '.cmd'],
	aliases: ['Batch', 'bat'],
	loader: function () {
		// eslint-disable-next-line
		return _monaco.Promise.wrap(require('monaco-editor/esm/vs/basic-languages/bat/bat.js'))
	}
})
registerLanguage({
	id: 'javascript',
	extensions: ['.js', '.es6', '.jsx'],
	firstLine: '^#!.*\\bnode',
	filenames: ['jakefile'],
	aliases: ['JavaScript', 'javascript', 'js'],
	mimetypes: ['text/javascript'],
	loader: function () {
		// eslint-disable-next-line
		return _monaco.Promise.wrap(require('monaco-editor/esm/vs/basic-languages/javascript/javascript.js'))
	}
})
