var test = require('tap').test;

var tapPrettify = require('../');

test("isUsefulLine() works", function(t) {
  var isUsefulLine = tapPrettify._isUsefulLine;

  t.ok(isUsefulLine("hello there", ["hi", "there"]));
  t.notOk(isUsefulLine("hello there", ["hi", "bye"]));
  t.notOk(isUsefulLine("hello there", []));

  t.end();
});
