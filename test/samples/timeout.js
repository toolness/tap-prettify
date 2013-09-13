/*

  Running this test file like this:

    $ bin/tap-prettify.js --timeout=0.1 test/samples/timeout.js

  Should fail with output:

    TIMEOUT test/samples/timeout.js
*/

var test = require('tap').test;

test("this thing takes 60 seconds", function(t) {
  setTimeout(function() { t.end(); }, 60000);
});
