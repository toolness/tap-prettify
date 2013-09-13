var stream = require('stream');
var split = require('split');

var removeTracebacks = require('../lib/remove-tracebacks');
var stripColors = require('../lib/strip-colors');

function simplify(stream) {
  return stream
    .pipe(stripColors())
    .pipe(split())
    .pipe(removeTracebacks());
}

module.exports = function simplifyOutput(buffer, cb) {
  var readable = new stream.Readable();
  var writable = new stream.Writable({decodeStrings: false});
  var chunks = [];

  readable._read = function() {
    this.push(buffer);
    buffer = null;
  };
  writable._write = function(chunk, encoding, callback) {
    chunks.push(chunk);
    callback();
  };
  writable.on('finish', function() {
    cb(chunks.join(''));
  });

  simplify(readable).pipe(writable);
}

if (!module.parent)
  simplify(process.stdin).pipe(process.stdout);
