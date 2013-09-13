var split = require('split');
var through = require('through');

function removeTracebacks() {
  var inTraceback = false;

  return through(function write(line) {
    if (inTraceback) {
      if (line == "") {
        this.queue("    ...\n\n");
        inTraceback = false;
      }
    } else {
      this.queue(line + "\n");
    }

    if (line == "  Traceback (most recent call first):")
      inTraceback = true;
  });
}

module.exports = removeTracebacks;

if (!module.parent)
  process.stdin
    .pipe(split())
    .pipe(removeTracebacks())
    .pipe(process.stdout);
