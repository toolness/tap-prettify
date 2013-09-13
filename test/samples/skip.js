/*

  Running this test file like this:

    $ bin/tap-prettify.js test/samples/skip.js

  Should output:

    ✓ this thing is cool
    S this thing will be skipped
    ✓ this thing is THE BEST

    Finished testing test/samples/skip.js.

    3/3 tests passed, 1 skipped.

*/

var test = require('tap').test;

test("this thing is cool", function(t) {
  t.equals(1+1, 2);
  t.end();
});

test("this thing will be skipped", function(t) {
  t.skip();
  t.end();
});

test("this thing is THE BEST", function(t) {
  t.equals(1+2, 3);
  t.end();
});
