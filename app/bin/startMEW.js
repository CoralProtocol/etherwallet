#! /usr/bin/env node
console.log('here')
var open = require("open");
console.log(open)
var separator = process.platform=="win32" ? "\\" : "/";
open(require('path').dirname(require.main.filename)+separator+".."+separator+"index.html");
