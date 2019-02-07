import artTip from './artTip'
import {registerLanguage} from './register.js'
// Allow for running under nodejs/requirejs in tests
var _monaco = (typeof monaco === 'undefined' ? self.monaco : monaco)
registerLanguage({
	id: 'artJava',
	extensions: ['.artJava'],
	aliases: ['artJava'],
	mimetypes: ['artJava'],
	loader: function () {
		return _monaco.Promise.wrap(import('./art/java.js'))
	}
})
registerLanguage({
	id: 'artHtml',
	extensions: ['.artHtml'],
	aliases: ['artHtml'],
	mimetypes: ['artHtml'],
	loader: function () {
		return _monaco.Promise.wrap(import('./art/html.js'))
	}
})

monaco.languages.registerCompletionItemProvider('artJava', {
	provideCompletionItems: (data) => {
		return artTip
	}
})
monaco.languages.registerCompletionItemProvider('artHtml', {
	provideCompletionItems: (data) => {
		return artTip
	}
})
