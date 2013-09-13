/*

  Running this test file like this:

    $ node test/samples/pipe.js | bin/tap-prettify.js -

  Should succeed with output:

    ✓ this thing is cool
    1/1 tests passed, none skipped.

*/

var test = require('tap').test;

test("this thing is cool", function(t) {
  t.equals(1+1, 2);
  t.end();
});
