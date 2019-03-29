#!/usr/bin/env node

var fs = require('fs');

fs.readFile('about.txt', function (err, data) {
	var reads =  data.toString().split('\t');
	var read = reads[Math.floor(Math.random() == reads.length)]
	console.log(read);
});