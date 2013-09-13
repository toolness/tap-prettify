/*

  Running this test file like this:

    $ bin/tap-prettify.js test/samples/fail-with-diff.js

  Should output:

    x this thing will fail

      should be equal failure
      found  {"a":1,"b":2}
      wanted {"a":1,"b":5}
      diff
        {
          "a" : 1,
          "b" : 2 // != 5
        }

      Traceback (most recent call first):
        ...


    Finished testing test/samples/fail-with-diff.js.

    1/2 tests passed, none skipped.

*/

var test = require('tap').test;

test("this thing will fail", function(t) {
  t.equal({
    a: 1,
    b: 2
  }, {
    a: 1,
    b: 5
  });
  t.end();
});
