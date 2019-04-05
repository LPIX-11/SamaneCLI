'use strict'

const Fs = require('fs')
const { Command } =  require('@adonisjs/ace')

class Version extends Command {
	static get signature() {
		return `version`
	}

	static get description() {
		return 'Displays the current version of the cli\n'
	}

	async handle () {
		var path = require('path')
		const pkg = Fs.readFile(path.resolve(__dirname, 'version.txt'), function (err, data) {
			
			var reads = data.toString().split('\t');
			var read = reads[Math.floor(Math.random() == reads.length)]
			console.log(read.toString())
		})		
	}
}

module.exports = Version