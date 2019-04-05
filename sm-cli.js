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
ace.addCommand(require('./commands/framework/ask'))
ace.addCommand(require('./commands/framework/start'))

// Boot of ace to execute commands
ace.wireUpWithCommander()
ace.invoke()
