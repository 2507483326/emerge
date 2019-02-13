import constBuilder from './assemble'
const files = require.context('.', false, /\.js$/)
let buildConfig = {
	config: {
	}
}
files.keys().forEach(key => {
	if (key === './index.js' || key === './assemble.js') return
	buildConfig.config[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default constBuilder(buildConfig)
