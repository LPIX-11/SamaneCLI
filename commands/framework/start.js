/**
 * @author Mohamed Johnson
 * 03/2019
 */
 
'use strict'

const { Command } = require('@adonisjs/ace')
const { exec } = require('child_process')
const Ora = require('ora')

class Start extends Command {
	static get signature() {
		return `
				start 
				{ projectName?=...: Defines the project name }
				{ -p, --project: Creates a new project } 
				{ -b, --blank: Creates a new project with all settings as default } 
				{ -m, --minimal: Creates a new project with minimal settings }
				{ -n, --noInteraction: Directly creates a project with default settings without asking questions }
		`
	}

	static get description() {
		return 'Default starts with -p. It creates a new project with user interaction.\n'
	}

	async handle({ projectName }, { blank, minimal, noInteraction }) {		
		// No interaction from user required in this Section
		if (`${ noInteraction }`  === true) {
			// Assinging a default name to the project
			projectName = 'SamaneProject'

			console.log(`\nStarting sm start -p ${ projectName } with default settings ~ No Interaction Selected`)
			// Calling the the default settings project downloader
			await this.waitForDownload(`${ projectName }`)
		}
		// In this section we interact with the user
		else if (`${ projectName }` === '...') {
			// Waiting for him to give the name of the project
			projectName = await this.ask('Name of the project? ', 'SamaneProject')
			
			if (!blank && !minimal) {
				// Asking for connection with database if not a blank or a minimal project
				const confirmDbLink = await this.confirm('Do you want to link your project to a database? ', { default: false })

				// If the user wants connection with a database
				// Asking what type of connection is it
				// On wich database server
				if (confirmDbLink) {
					// Including the cloud databases
					const databaseType = await this.choice('How to interact with database? ', [
						'Relational'
					],
					'Relational')

					/* To implement after
						,
						'NoSQL',
						'Cloud'
					*/

					// Database Instace
					let database

					// Database Listening Port
					let databasePort

					// Asking for the database
					if(databaseType === 'Relational') {
						database = await this.choice('Which database? ', [
							'MySQL',
							'MariaDB',
							'Oracle',
							'PostgreSQL'							
						],
						'MySQL') // Default Selection

						// Retrieve the database connection port following the selected database
						if (database === 'MySQL') {
							databasePort = await this.ask('Port: ', '3306')
						
						} else if (database === 'MariaDB') {
							databasePort = await this.ask('Port: ', '3306')
						
						} else if (database === 'Oracle') {
							databasePort = await this.ask('Port: ', '1521')
						
						} else {
							databasePort = await this.ask('Port: ', '5432')
						}


					} else if(databaseType === 'NoSQL') {
						database = await this.choice('Which database? ', [
							'MongoDB',
							'PostgreSQL'
							
						],
						'MongoDB') // Default Selection
					} else {
						database = await this.choice('Which database? ', [
							'Firebase',
							'MongoDB Cloud',
							'Oracle Cloud'
							
						],
						'Firebase') // Default Selection
					}

					// Connection to the database
					const connectionType = await this.choice('How to interact with database? ', [
						'PDO',
						'ORM'
					],
					'PDO') // Default Selection

					// Retrieve the database name
					const databaseName = await this.ask('Database Name? ', 'samane')

					// Retrieve database host
					const databaseHost = await this.ask('Database Host? ', 'localhost')

					console.log('\nDatabase Configurations\n')

					console.log(`Database Type: ${ databaseType }`)
					console.log(`Database Instance: ${ database }`)
					console.log(`Database Name: ${ databaseName }`)
					console.log(`Database Port: ${ databasePort }`)
					console.log(`Database Host: ${ databaseHost }`)
					console.log(`Connection Type: ${ connectionType }`)
				}
			}

			console.log(`\nStarting sm start -p ${projectName} ${blank ? 'with default settings' : ''} ${minimal ? 'with minimal settings' : ''}`)
			// Calling the the default settings project downloader
			await this.waitForDownload(`${projectName}`)
		}
	}

	// This function is called to download the default settings project. It returns a promise when the treatment is finished
	async waitForDownload(projectName) {
		return new Promise(resolve => this.downloadFramework(projectName))
	}

	async downloadFramework(projectName) {
		// Starting the spinner to make the user wait till everything is treated
		const spinner = Ora('Processing ... \n')
		spinner.start()

		// Using the promise to executes the composer command that download the default settings Framework
		return new Promise (resolve => exec('composer create-project samane/samanemvc ' + projectName + ' --verbose', (err, stderr, stdout) => {
											if (err) {												
												spinner.color = 'red'

												// node couldn't execute the command
												console.log('Could not create the project\n')
                                                spinner.fail('Project: ' + projectName + ' not created due to following errors:')
											} else {
												spinner.color = 'green'
												spinner.text = 'Done'

												// The project has been successfuly created
                                                spinner.succeed(projectName + ' Created')
											}

											// the *entire* stdout and stderr (buffered)
											console.log(`trace: ${stdout}`)
											// console.log(`stderr: ${stderr}`)
										})
							)
		// Stopping the spinner when the actions are done
		spinner.stop()
	}

	// Waiting a second
	async waitASecond() {
		return new Promise(resolve => setTimeout(resolve, 1000))
	}
}


module.exports = Start
