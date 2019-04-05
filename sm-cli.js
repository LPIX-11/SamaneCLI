#!/usr/bin/env node
'use stric'
// Since we're using es6 we don't need ;
const ace = require('@adonisjs/ace')

// ace.addCommand(require('./commands/hello'))
// ace.addCommand(require('./commands/spin'))
ace.addCommand(require('./commands/version'))
ace.addCommand(require('./commands/framework/start'))

// Boot of ace to execute commands
ace.wireUpWithCommander()
ace.invoke()
