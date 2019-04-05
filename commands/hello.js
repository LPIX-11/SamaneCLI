'use strict'

const { Command } =  require('@adonisjs/ace')

class Hello extends Command {
	static get signature() {
		return `
			hello 
			{ name: displays the user name }
			{ -f, --friendly: say a name greeting } 
			{ -g, --grumpy-greeting: say a grumpy greeting }
		` 
	}

	static get description() {
		return 'Says hello to a user\n'
	}

	async handle ({ name }, { friendly, grumpyGreeting }) {
		console.log(`Hello ${ name } ${friendly ? 'friend' : ''} ${grumpyGreeting ? '-_-': ''}`)
	}
}

module.exports = Hello