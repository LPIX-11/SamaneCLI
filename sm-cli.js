#!/usr/bin/env node

/**
 * @author Mohamed Johnson
 * 03/2019
 */

'use stric'

// Since we're using es6 we don't need ;
const ace = require('@adonisjs/ace')

// Adding all created commands
ace.addCommand(require('./commands/version'))
ace.addCommand(require('./commands/framework/start'))

// Geenerate Models, Entities and Controllers
ace.addCommand(require('./commands/framework/generate/generate'))

// Commands shortcuts

// ace.addCommand(require('./commands/framework/shortcuts/generate_shortcut'))

// Boot of ace to execute commands
ace.wireUpWithCommander()
ace.invoke()
