/**
 * @author Mohamed Johnson
 * 03/2019
 */
 
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
		// Creating a constant that can hold the path of files
		var path = require('path')

		// Retrieving the file path and extracting it's content		
		const pkg = Fs.readFile(path.resolve(__dirname, 'version.txt'), function (err, data) {
			
			var reads = data.toString().split('\t'); // Exploding the retrieved data
			var read = reads[Math.floor(Math.random() == reads.length)] // Exploiting each reading position
			console.log(read.toString()) // Printing the file content
		})		
	}
}

module.exports = Version