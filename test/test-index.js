var tap = require('tap');
var test = tap.test;

var tapPrettify = require('../');

test("isUsefulLine() works", function(t) {
  var isUsefulLine = tapPrettify._isUsefulLine;

  t.ok(isUsefulLine("hello there", ["hi", "there"]));
  t.notOk(isUsefulLine("hello there", ["hi", "bye"]));
  t.notOk(isUsefulLine("hello there", []));

  t.end();
});

test("exports of 'tap' are available", function(t) {
  ['Producer', 'Consumer', 'Test', 'Harness', 'Runner',
   'test', 'assert'].forEach(function(name) {
    t.ok(tapPrettify[name] && tapPrettify[name] === tap[name],
         "tap." + name + " is exported");
  });
  t.end();
});
