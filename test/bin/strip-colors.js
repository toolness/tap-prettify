var ESCAPE = 27;
var LOWERCASE_M = 'm'.charCodeAt(0);

var inEscapeSequence = false;

process.stdin.on("data", function(chunk) {
  for (var i = 0; i < chunk.length; i++) {
    if (inEscapeSequence) {
      if (chunk[i] == LOWERCASE_M)
        inEscapeSequence = false;
    } else {
      if (chunk[i] == ESCAPE)
        inEscapeSequence = true;
      else
        process.stdout.write(new Buffer([chunk[i]]));
    }
  }
});
