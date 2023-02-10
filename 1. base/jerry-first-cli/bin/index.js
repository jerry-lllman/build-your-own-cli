#!/usr/bin/env node

const { argv } = require('node:process')
const lib = require('jerry-first-cli-lib')

const { version } = require('../package.json')


const command = argv[2]

const options = argv.slice(3)

if (options.length) {
	let [option, param] = options

	option = option.replace('--', '')

	if (command) {
		if (lib[command]) {
			lib[command]({ option, param })
		} else {
			console.log('无效的命令')
		}
	} else {
		console.log('请输入可执行的命令')
	}
}

if (command.startsWith('--') || command.startsWith('-')) {
	const globalOption = command.replace(/--|-/g, '')
	if (globalOption === 'version' || globalOption === 'V') {
		console.log(version)
	}
}