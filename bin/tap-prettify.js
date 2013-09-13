#!/usr/bin/env node

var argv = process.argv.slice(2)
  , prettifyTapOutput = require("../")
  , path = require("path")
  , Runner = require("tap/lib/tap-runner")
  , Consumer = require("tap/lib/tap-consumer")

  , nopt = require("nopt")

  , knownOpts =
    { cover: [path, false]
    , "cover-dir": path
    , stderr: Boolean
    , stdout: Boolean
    , diag: Boolean
    , version: Boolean
    , tap: Boolean
    , timeout: Number
    , gc: Boolean
    }

  , shorthands =
    // debugging 1: show stderr
    { d: ["--stderr"]
    // debugging 2: show stderr and tap
    , dd: ["--stderr", "--tap"]
    // debugging 3: show stderr, tap, AND always show diagnostics.
    , ddd: ["--stderr", "--tap", "--diag"]
    , "expose-gc": ["--gc"]
    , g: ["--gc"]
    , e: ["--stderr"]
    , t: ["--timeout"]
    , o: ["--tap"]
    , c: ["--cover"]
    , v: ["--version"]
    , "?": ["--help"]
    , h: ["--help"]
    }

  , defaults =
    { cover: "./lib"
    , "cover-dir": "./coverage"
    , stderr: process.env.TAP_STDERR
    , tap: true
    , diag: process.env.TAP_DIAG
    , timeout: +process.env.TAP_TIMEOUT || 30
    , gc: false
    , version: false
    , help: false }

  , options = nopt(knownOpts, shorthands)

if (options.version) {
  console.log(require("../package.json").version)
  process.exit(0)
}

if (options.help || !options.argv.original.length) {
  console.log(function(){/*

Usage:
    tap-prettify <options> <files>

    Run the files as tap tests, parse the output, and report the results
    nicely.

    If the only file provided is -, this program will prettify the tap stream
    from stdin.

Options:

    --stderr    Print standard error output of tests to standard error.
    --gc        Expose the garbage collector to tests.
    --timeout   Maximum time to wait for a subtest, in seconds. Default: 30
    --version   Print the version of node tap-prettify.
    --help      Print this help.

*/}.toString().split(/\n/).slice(1, -1).join("\n"))
  process.exit(0)
}


Object.keys(defaults).forEach(function (k) {
  if (!options.hasOwnProperty(k)) options[k] = defaults[k]
})

// other tests that might rely on these
if (options.diag) process.env.TAP_DIAG = true
if (options.tap) process.env.TAP = true
if (options.timeout) process.env.TAP_TIMEOUT = options.timeout

var consumer = new Consumer()
  , debugTapPrettify = 'TAP_PRETTIFY_DEBUG' in process.env

if (options.argv.original.length == 1 &&
    options.argv.original[0] == '-') {
  prettifyTapOutput({
    debug: debugTapPrettify,
    tapConsumer: consumer
  });

  process.stdin.setEncoding('utf8');
  process.stdin.pipe(consumer);
} else {
  var r = new Runner(options)

  prettifyTapOutput({
    debug: debugTapPrettify,
    tapConsumer: consumer,
    usefulTracebackSubstrings: options.argv.original.map(function(arg) {
      return path.resolve(process.cwd(), arg)
    })
  })

  r.pipe(consumer)

  r.on("end", function () {
    process.exit(r.results.tests - r.results.pass)
  });
}
