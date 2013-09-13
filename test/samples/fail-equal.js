/*

  Running this test file like this:

    $ bin/tap-prettify.js test/samples/fail-equal.js

  Should fail with output:

    ✓ this thing is ok
    x this thing will fail

      should be equal failure
      found  1
      wanted 2

      Traceback (most recent call first):
        ...

    ✓ this thing is also ok

    Finished testing test/samples/fail-equal.js.

    3/4 tests passed, none skipped.

*/

var test = require('tap').test;

test("this thing is ok", function(t) {
  t.equals(1, 1);
  t.end();
});

test("this thing will fail", function(t) {
  t.equal(1, 2);
  t.end();
});

test("this thing is also ok", function(t) {
  t.equals(1, 1);
  t.end();
});
