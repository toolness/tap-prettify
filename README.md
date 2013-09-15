This makes node [Test Anything Protocol][tap] test runner output
nicely readable, like so:

![Screenshot](http://labs.toolness.com/tap-prettify-2.png)

To use it, simply `npm install tap-prettify` and then use the
`tap-prettify` executable instead of `tap` to run your tests.

Here's the help documentation for `tap-prettify`:

```
Usage:
    tap-prettify <options> <files>

    Run the files as tap tests, parse the output, and report the results
    nicely.

    If the only file provided is -, this program will prettify the tap stream
    from stdin.

Options:

    --stderr    Print standard error output of tests to standard error.
    --gc        Expose the garbage collector to tests.
    --timeout   Maximum time to wait for a subtest, in seconds. Default: 30
    --version   Print the version of node tap-prettify.
    --help      Print this help.
```

See the [tap README][] for more guidance on how to use tap to write tests.

Finally, the `tap-prettify` module inherits everything from the `tap`
module, so you can use it as a substitute if needed.

  [tap]: https://github.com/isaacs/node-tap
  [tap README]: https://github.com/isaacs/node-tap#readme
