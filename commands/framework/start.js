'use strict'

const { Command } = require('@adonisjs/ace')
const { exec } = require('child_process')
const Ora = require('ora')

class Start extends Command {
	static get signature() {
		return `
				start 
				{ projectName?=SamaneProject: defines the project name }
				{ -p, --project: Creates a new project } 
				{ -b, --blank: Creates a new project with all settings as default } 
				{ -m, --minimal: Creates a new project with minimal settings }
		`
	}

	static get description() {
		return 'Default starts with -p. It creates a new project with user interaction.\n'
			+	'\t\t* If used with -b or --blank, it creates a project with all default functionalities.\n'
			+	'\t\t* If used with -m or --minimal, it creates project with minimal settings.\n'
	}

	async handle({ projectName }, { blank, minimal }) {		
		console.log(`\nStarting sm start -p ${projectName} ${blank ? 'with default settings' : ''} ${minimal ? 'with minimal settings' : ''}`)
		
		await this.waitForDownload(`${projectName}`)

	}

	async waitForDownload(projectName) {
		return new Promise(resolve => this.downloadFramework(projectName))
	}

	async downloadFramework(projectName) {
		const spinner = Ora('Processing ... \n')
		spinner.start()

		return new Promise (resolve => exec('composer create-project samane/samanemvc ' + projectName + ' --verbose', (err, stderr, stdout) => {
											if (err) {												
												spinner.color = 'red'

												// node couldn't execute the command
												console.log('Could not create the project\n')
                                                spinner.fail('Project: ' + projectName + ' not created due to following errors:')
											} else {
												spinner.color = 'green'
												spinner.text = 'Done'

												// await this.waitASecond()
                                                spinner.succeed(projectName + ' Created')
											}

											// the *entire* stdout and stderr (buffered)
											console.log(`trace: ${stdout}`)
											// console.log(`stderr: ${stderr}`)
										})
							)
		spinner.stop()
	}

	async waitASecond() {
		return new Promise(resolve => setTimeout(resolve, 1000))
	}
}


module.exports = Start
