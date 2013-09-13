var through = require('through');

var ESCAPE = 27;
var LOWERCASE_M = 'm'.charCodeAt(0);

function stripColors() {
  var inEscapeSequence = false;

  return through(function write(chunk) {
    for (var i = 0; i < chunk.length; i++) {
      if (inEscapeSequence) {
        if (chunk[i] == LOWERCASE_M)
          inEscapeSequence = false;
      } else {
        if (chunk[i] == ESCAPE)
          inEscapeSequence = true;
        else
          this.queue(new Buffer([chunk[i]]));
      }
    }
  });
}

module.exports = stripColors;

if (!module.parent)
  process.stdin
    .pipe(stripColors())
    .pipe(process.stdout);
