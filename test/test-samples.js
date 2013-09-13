var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var test = require('tap').test;
var simplifyOutput = require('./lib/simplify-output');
var rootDir = path.normalize(__dirname + '/..');
var samplesDir = __dirname + '/samples';

function dedent(text, amount) {
  return text.split('\n').map(function(line) {
    return line.slice(amount);
  }).join('\n');
}

fs.readdirSync(samplesDir).forEach(function(filename) {
  if (!/\.js$/.test(filename)) return;

  var abspath = path.join(samplesDir, filename);
  var code = fs.readFileSync(abspath, "utf8");
  var shellCmd = code.match(/^    \$ (.+)$/m)[1];
  var should = code.match(/^  Should (fail|succeed)? .+:((.|\n)+)\*\//m);
  var exitType = should[1];
  var expectedStdout = dedent(should[2], 4);

  test(filename + " " + exitType + "s with expected output", function(t) {
    exec(shellCmd, {
      cwd: rootDir
    }, function(err, stdout, stderr) {
      if (exitType == 'succeed') {
        if (err !== null)
          t.fail("process must succeed");
      } else {
        if (!(err && err.code))
          t.fail("process must fail");
      }
      simplifyOutput(stdout, function(simplifiedStdout) {        
        t.equal(simplifiedStdout.trim(), expectedStdout.trim());
        t.end();
      });
    });
  });
});
