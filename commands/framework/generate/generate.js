/**
 * @author Djiby Ndiaye
 * 04/2019
 * Edited by Mohamed Johnson
 */

 
'use strict'

const path        = require('path')
const fs          = require('fs')
const Ora         = require('ora')
const Generator   = require(path.resolve(__dirname,'../classes/Generator.js'))
const { Command } =  require('@adonisjs/ace')

class Generate extends Command {
	static get signature() {
        return `
                generate
                {  componentName : Name of your wanted component }
                { -c , --controller: Generates a new Controller Class Skeleton }
                { -m , --model: Generates a new Model Class Skeleton }
                { -e , --entity: Generates a new Entity Class Skeleton }
        `
	}

	static get description() {
		return 'Allows to generate either an Entity - Controller - Model. View [sm generate --help]\n'
	}

	async handle ({  componentName  }, { controller, model, entity }) {
        const spinner = Ora('Processing ... \n')
        spinner.start()	
                
        if(controller) {          
           this.generateController(componentName, spinner)
        }
        else if(model) {
          this.generateModel(componentName, spinner)
        }
        else if(entity) {
           this.generateEntity(componentName, spinner)
        }
        else{
            spinner.fail(`${ this.chalk.red(`specify the type of File to create \n ${ this.chalk.Blue(`-Controller`)} \n ${ this.chalk.green(`-Model`)} \n ${ this.chalk.yellow(`-Entity`)})`)}`)
        }

        spinner.stop
		
    }
    
    async waitASecond() {
		return new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    /**
     * Generate Controller Section
     * @param {string}  componentName 
     * @param {Object} spinner
     */
    async generateController(componentName, spinner) {
        // Defining the path where to generate the controller
        fs.open(path.resolve(__dirname, `${ componentName }Controller.class.php`), 'wx', (err, fd) => {
            // If controller already exists
            if (err && err.code === 'EEXIST') {
                spinner.fail(`${ this.chalk.yellow(`${ componentName }Controller does already exist`)}`)

            } else {
                // Waiting a second before opening the newly generated file
                this.waitASecond()

                // Filling the controller default content
                this.fillFileContent(componentName, 'Controller')
                spinner.succeed(`${ this.chalk.green(`${ componentName }Controller is generated`)}`)
            }   
        })
    }

    /**
     * Model Generation Section
     * @param {string}  componentName 
     * @param {Object} spinner
     */
    async generateModel(componentName, spinner) {
        // Defining the path where to generate the model
        fs.open(path.resolve(__dirname, `${ componentName }Model.php`), 'wx', (err, fd) => {
            // If model already exists
            if (err && err.code === 'EEXIST') {
                spinner.fail(`${ this.chalk.yellow(`${ componentName }DBOrm does already exist`)}`)
               
            } else {
                // Waiting a second before opening the newly generated file
                this.waitASecond()

                // Filling the model default content
                this.fillFileContent(componentName,'Model')
                spinner.succeed(`${ this.chalk.green(`${ componentName }DBOrm is generated`)}`)
            }   
        })
    }

    /**
     * Entity generation Section
     * @param {string}  componentName 
     * @param {Object} spinner
     */
    async generateEntity(componentName, spinner) {
        // Defining the path where to generate the entity
        fs.open(path.resolve(__dirname, `${ componentName }.php`), 'wx', (err, fd) => {
            // If entity already exists
            if (err && err.code === 'EEXIST') {
                spinner.fail(`${ this.chalk.yellow(`The entity ${ componentName } does already exist`)}`)

            } else {
                // Waiting a second before opening the newly generated file
                this.waitASecond()

                // Filling the entity default content
                this.fillFileContent(componentName)
                spinner.succeed(`${ this.chalk.green(`${ componentName } is generated`)}`)
            }   
        })
    }


    /**
     * Filling Generated Files Contents
     * @param {string}  componentName, name of the component
     * @param {string} type, type of the content to fill
     */
    async fillFileContent(componentName, type) { 
        // Content Filler will hold the streaming methods and the file location
        let contentFiller = fs.createWriteStream(path.resolve(__dirname, `${ componentName }${type ? type: ''}.php`));

        // Calling the Generator Class
        let generator = new Generator(componentName)
        
        // Filling the default content pursuant the file type
        if(type === 'Controller') {
            // Redifining contentFiller value for controller
            contentFiller = fs.createWriteStream(path.resolve(__dirname, `${ componentName }${type ? type: ''}.class.php`));
            
            // Writing the content encode in UTF-8
            contentFiller.write(generator.generateControllerContent(componentName), { encoding:'utf-8',flags:'r+' } )

            // This method is called when the all of the content is written
            contentFiller.on('finish', () => {  
                console.log(`${ componentName } default content generated`);
            });

            // close the stream
            contentFiller.end();  
    
        }

        if(type === 'Model') {
            // Writing the content encode in UTF-8
            contentFiller.write(generator.generateModelContent(componentName), { encoding:'utf-8',flags:'r+' } )

            // This method is called when the all of the content is written
            contentFiller.on('finish', () => {  
                console.log(`${ componentName } default content generated`);
            });

            // close the stream
            contentFiller.end();  

        }

        if (type === 'Entity') {
            // Writing the content encode in UTF-8
            contentFiller.write(generator.generateEntityContent(componentName), { encoding:'utf-8',flags:'r+' } )

            // This method is called when the all of the content is written
            contentFiller.on('finish', () => {  
                console.log(`${ componentName } default content generated`);
            });

            // close the stream
            contentFiller.end();  

        }
    }

}

module.exports = Generate