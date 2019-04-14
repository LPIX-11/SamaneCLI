/**
 * @author Djiby Ndiaye
 * 04/2019
 */
 
'use strict'

var path = require('path')
const fs = require('fs')
const Ora = require('ora')
const Generator = require(path.resolve(__dirname,'ClassGenerator.js'))
const { Command } =  require('@adonisjs/ace')

class CreateFile extends Command {
	static get signature() {
        return `
        create
        { name: name of your controller }
        { -c , --controller: Create new File }
        { -m , --model: Create new File }
        { -e , --entity: Create new File }
        `
	}

	static get description() {
		return 'Create:(name) new Controller if not exist\n'
	}

	async handle ({name},{controller,model,entity}) {
  
        const spinner = Ora('Processing ... \n')
        spinner.start()	
                
        if(controller) {          
           this.createController(name,spinner)
        }
        if(model) {
          this.createModel(name,spinner)
        }
        if(entity) {
           this.createEntity(name,spinner)
        }
        else{
            spinner.fail(`${ this.chalk.red(`specify the type of File to create \n ${ this.chalk.Blue(`-Controller`)} \n ${ this.chalk.green(`-Model`)} \n ${ this.chalk.yellow(`-Entity`)})`)}`)
        }

        spinner.stop
          
		
    }
    
    async waitASecond() {
		return new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    /******************** Create Controller ********************/
    async createController(name,spinner) {
        var path = require('path')
        fs.open(path.resolve(__dirname, `${name}Controller.php`), 'wx', (err, fd) => {
            if (err && err.code === 'EEXIST') {
                spinner.fail(`${ this.chalk.yellow(`${name}Controller does created already exist`)}`)
            }else{
                this.waitASecond()
                this.modifFile(name,'Controller')
                spinner.succeed(`${ this.chalk.green(`${name}Controller does created`)}`)
            }   
        })
    }

    /******************** Create Model ********************/
    async createModel(name,spinner) {
        var path = require('path')
        fs.open(path.resolve(__dirname, `${name}DBOrm.php`), 'wx', (err, fd) => {
            if (err && err.code === 'EEXIST') {
                spinner.fail(`${ this.chalk.yellow(`${name}DBOrm does created already exist`)}`)
               
            }else{
                this.waitASecond()
                this.modifFile(name,'Model')
                spinner.succeed(`${ this.chalk.green(`${name}DBOrm does created`)}`)
            }   
        })
    }

     /********************  Create Entity ********************/
    async createEntity(name,spinner) {
        var path = require('path')
        fs.open(path.resolve(__dirname, `${name}.php`), 'wx', (err, fd) => {
            if (err && err.code === 'EEXIST') {
                spinner.fail(`${ this.chalk.yellow(`${name} does created already exist`)}`)
            }else{
                this.waitASecond()
                this.modifFile(name)
                spinner.succeed(`${ this.chalk.green(`${name} does created`)}`)
            }   
        })
    }


    /********************  modification du Fichier Creer ********************/
    async modifFile(name,type){ 
    
        const fr = fs.createReadStream(path.resolve(__dirname, `${name}${type?type:''}.php`),{encoding:'utf-8',flags:'r+'})
        const fw = fs.createWriteStream(path.resolve(__dirname, `${name}${type?type:''}.php`),{encoding:'utf-8',flags:'r+'})

        let generator = new Generator(name)
         if(type === 'Controller')
        {     
        
        fr.push(generator.generateController(name))
    
        }else if(type === 'Model')
        {
              
        fr.push(generator.generateModel(name))   
        }else{   
        
        fr.push(generator.generateEntity(name)) 
        }

        fr.push(null) 
        fr.pipe(fw)
     
    }

}
module.exports = CreateFile