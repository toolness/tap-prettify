var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var test = require('tap').test;
var rootDir = path.normalize(__dirname + '/..');
var samplesDir = __dirname + '/samples';

function dedent(text, amount) {
  return text.split('\n').map(function(line) {
    return line.slice(amount);
  }).join('\n');
}

fs.readdirSync(samplesDir).forEach(function(filename) {
  if (!/\.js$/.test(filename)) return;

  test(filename + " produces expected output", function(t) {
    var abspath = path.join(samplesDir, filename);
    var code = fs.readFileSync(abspath, "utf8");
    var shellCmd = code.match(/^    \$ (.+)$/m)[1] +
                   ' | node test/bin/simplify-output.js';
    var expect = dedent(code.match(/^  Should output:((.|\n)+)\*\//m)[1], 4);

    exec(shellCmd, {
      cwd: rootDir
    }, function(err, stdout, stderr) {
      t.equal(stdout.toString().trim(), expect.trim());
      t.end();
    });
  });
});
