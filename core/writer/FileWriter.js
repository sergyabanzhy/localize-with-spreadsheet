"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LSLine_1 = require("../modeles/LSLine");
var os_1 = require("os");
var fs = require("fs");
var LSArray_1 = require("../modeles/LSArray");
/**
 * Created by amatsegor on 5/4/17.
 */
var FileWriter = (function () {
    function FileWriter() {
    }
    FileWriter.prototype.write = function (filePath, entities, transformer, options) {
        var fileContent;
        if (fs.existsSync(filePath)) {
            fileContent = fs.readFileSync(filePath, options.encoding);
        }
        var valueToInsert = this.getTransformedLines(entities, transformer);
        var output = transformer.insert(fileContent, valueToInsert, options);
        FileWriter.writeFileAndCreateDirectoriesSync(filePath, output, 'utf8');
    };
    FileWriter.prototype.getTransformedLines = function (entities, transformer) {
        var valueToInsert = '';
        entities.filter(function (entity) { return !entity.isEmpty(); })
            .forEach(function (entity, index) {
            if (entity instanceof LSLine_1.LSLine) {
                if (entity.isComment()) {
                    valueToInsert += transformer.transformComment(entity.getComment());
                }
                else {
                    valueToInsert += transformer.transformKeyValue(entity.getKey(), entity.getValue());
                }
            }
            else if (entity instanceof LSArray_1.LSArray) {
                valueToInsert += transformer.transformArray(entity);
            }
            if (index != entities.length - 1) {
                valueToInsert += os_1.EOL;
            }
        });
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
