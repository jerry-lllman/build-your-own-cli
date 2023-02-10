module.exports = {
	sum(a, b) {
		return a + b
	},
	init({ option, param }) {
		console.log('initializing, please wait~')
		console.log('参数', option, param)
	}
}