export default function noRepeat (target, name, descriptor) {
	let oldValue = descriptor.value
	let isCanNext = true
	descriptor.value = async function (...args) {
		try {
			if (!isCanNext) {
				console.log(`========= ${name} 重复 =========`)
				return
			}
			isCanNext = false
			let result = await oldValue.apply(this, args)
			isCanNext = true
			return result
		} catch (e) {
			console.log(e)
			isCanNext = true
		}
	}
	return descriptor
}
