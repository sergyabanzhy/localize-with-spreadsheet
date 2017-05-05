var reporter = require('nodeunit').reporters.default;
reporter.run([
    './AndroidTransformerTests.js',
    './iOSTransformerTests.js',
    './LineTests.js',
    './GSReaderTests.js',
    './WriterTests.js',
    './ArrayTests.js'
]);
