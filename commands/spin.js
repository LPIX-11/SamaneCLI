'use strict'

const { Command } = require('@adonisjs/ace')
const Ora = require('ora')

class Spin extends Command{
	static get signature() {
		return `
				spin
		`
	}

	static get description() {
		return 'Spins'
	}

	async handle() { 
		const spinner = Ora('Processing ... ')
		spinner.start()

		spinner.color = 'green'
		spinner.text = 'Done'

		await this.waitASecond()
		spinner.warn(' Created')



	}

	async waitASecond() {
		return new Promise(resolve => setTimeout(resolve, 1000))
	}
}

module.exports = Spin