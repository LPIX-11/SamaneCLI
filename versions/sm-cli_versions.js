#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

fs.readFile(path.resolve(__dirname, 'version.txt'), function (err, data) {
	if (!data) return 1;
	var reads = data.toString().split('\t');
	var read = reads[Math.floor(Math.random() == reads.length)]
	console.log(read);
});