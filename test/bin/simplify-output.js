#!/usr/bin/env node

var split = require('split');

var removeTracebacks = require('../lib/remove-tracebacks');
var stripColors = require('../lib/strip-colors');

process.stdin
  .pipe(stripColors())
  .pipe(split())
  .pipe(removeTracebacks())
  .pipe(process.stdout);
