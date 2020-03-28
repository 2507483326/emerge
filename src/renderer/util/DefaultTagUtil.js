const DEFAULT_TAG_LIST = [
	{
		name: '主键',
		key: 'primary',
		color: 'primary',
		closable: false
	},
	{
		name: '不为空',
		key: 'notNull',
		color: 'warning',
		closable: false
	},
	{
		name: '文本',
		key: 'string',
		color: 'warning',
		closable: false
	},
	{
		name: '数值',
		key: 'number',
		color: 'warning',
		closable: false
	},
	{
		name: '日期',
		key: 'date',
		color: 'warning',
		closable: false
	}
]

export { DEFAULT_TAG_LIST }
export function getTagByKey (key) {
	let index = DEFAULT_TAG_LIST.findIndex(item => {
		return item.key === key
	})
	if (index >= 0) {
		return DEFAULT_TAG_LIST[index]
	}
	return null
}
