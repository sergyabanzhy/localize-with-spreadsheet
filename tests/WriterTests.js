var FileWriter = require('../core/writer/FileWriter').FileWriter;
var AndroidTransformer = require('../core/transformer/AndroidTransformer').AndroidTransformer;
var IOSTransformer = require('../core/transformer/IOSTransformer').iOSTransformer;
var LSLine = require('../core/modeles/LSLine').LSLine;
var EOL = require('os').EOL;

var androidTransformer = new AndroidTransformer();
var iosTransformer = new IOSTransformer();

exports.test_getTransformedLines_WithAndroidTransformer_ShouldReturnXml = function(test) {

    var writer = new FileWriter('path');
    var result = writer.getTransformedLines([new LSLine('key', 'value'), new LSLine('// commentaire'), new LSLine('key2', 'value2')], androidTransformer);

    test.equal('<string name="key">value</string>' + EOL + '<!-- commentaire -->' + EOL + '<string name="key2">value2</string>', result);

    test.done();
}

exports.test_getTransformedLines_WithiOSTransformer_ShouldReturnInFormat = function(test) {

    var writer = new FileWriter('path');
    var result = writer.getTransformedLines([new LSLine('key', 'value'), new LSLine('# commentaire'), new LSLine('key2', 'value2')], iosTransformer);

    test.equal('"key" = "value";' + EOL + '// commentaire' + EOL + '"key2" = "value2";', result);

    test.done();
}
