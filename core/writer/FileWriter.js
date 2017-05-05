"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var fs = require("fs");
/**
 * Created by amatsegor on 5/4/17.
 */
var FileWriter = (function () {
    function FileWriter() {
    }
    FileWriter.prototype.write = function (filePath, lines, transformer, options) {
        var fileContent;
        if (fs.existsSync(filePath)) {
            fileContent = fs.readFileSync(filePath, options.encoding);
        }
        var valueToInsert = this.getTransformedLines(lines, transformer);
        var output = transformer.insert(fileContent, valueToInsert, options);
        FileWriter.writeFileAndCreateDirectoriesSync(filePath, output, 'utf8');
    };
    FileWriter.prototype.getTransformedLines = function (lines, transformer) {
        var valueToInsert = '';
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (!line.isEmpty()) {
                if (line.isComment()) {
                    valueToInsert += transformer.transformComment(line.getComment());
                }
                else {
                    valueToInsert += transformer.transformKeyValue(line.getKey(), line.getValue());
                }
            }
            if (i != lines.length - 1) {
                valueToInsert += os_1.EOL;
            }
        }
        return valueToInsert;
    };
    //https://gist.github.com/jrajav/4140206
    FileWriter.writeFileAndCreateDirectoriesSync = function (filepath, content, encoding) {
        var mkpath = require('mkpath');
        var path = require('path');
        var dirname = path.dirname(filepath);
        mkpath.sync(dirname);
        fs.writeFileSync(filepath, content, encoding);
    };
    ;
    return FileWriter;
}());
exports.FileWriter = FileWriter;
