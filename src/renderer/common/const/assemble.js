let $consts = {}
function _constSingleBuilder ({ namespace, sep = "/", config = {} }) {
	config.forEach(cst => {
		let { name, value } = cst
		let constName = `${namespace.toUpperCase()}${sep}${name.toUpperCase()}`
		Object.defineProperty($consts, constName, { value })
	})
}

function constBuilder ({ sep = "/", config = [] }) {
	Object.keys(config).map(namespace => {
		_constSingleBuilder({ namespace, sep, config: config[namespace] })
	})
	return $consts
}

export default constBuilder
