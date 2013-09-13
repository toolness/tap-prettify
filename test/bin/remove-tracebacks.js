var split = require('split');
var inTraceback = false;

process.stdin
  .pipe(split())
  .on('data', function(line) {
    if (inTraceback) {
      if (line == "") {
        process.stdout.write("    ...\n\n");
        inTraceback = false;
      }
    } else {
      process.stdout.write(line + "\n");
    }

    if (line == "  Traceback (most recent call first):")
      inTraceback = true;
  });
