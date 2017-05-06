"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GSReader_1 = require("./core/reader/GSReader");
var FileWriter_1 = require("./core/writer/FileWriter");
var TransformerFactory_1 = require("./core/transformer/TransformerFactory");
var Gs2File = (function () {
    function Gs2File(reader, writer) {
        this.defaultValueCol = "";
        this.defaultKeyCol = "";
        this.defaultFormat = "";
        this.defaultEncoding = "";
        this.setValueCol = function (valueCol) {
            this.defaultValueCol = valueCol;
        };
        this.setKeyCol = function (keyCol) {
            this.defaultKeyCol = keyCol;
        };
        this.setFormat = function (format) {
            this.defaultFormat = format;
        };
        this.setEncoding = function (encoding) {
            this.defaultEncoding = encoding;
        };
        this.reader = reader;
        this.writer = writer;
    }
    Gs2File.fromGoogleSpreadsheet = function (spreadsheetKey, sheets) {
        if (sheets === void 0) { sheets = "*"; }
        var fileWriter = new FileWriter_1.FileWriter();
        return new Gs2File(new GSReader_1.GSReader(spreadsheetKey, sheets), fileWriter);
    };
    ;
    Gs2File.prototype.save = function (outputPath, opts, cb) {
        if (cb === void 0) { cb = null; }
        console.log('saving ' + outputPath);
        var self = this;
        this.opts = opts || {};
        var keyCol = opts.keyCol, valueCol = opts.valueCol, format = opts.format, encoding = opts.encoding;
        if (!keyCol) {
            keyCol = this.defaultKeyCol;
        }
        if (!valueCol) {
            valueCol = this.defaultValueCol;
        }
        if (!format) {
            format = this.defaultFormat;
        }
        if (!encoding) {
            encoding = this.defaultEncoding;
            if (!encoding) {
                encoding = 'utf8';
            }
            opts.encoding = encoding;
        }
        this.reader
            .select([], keyCol, valueCol, null)
            .then(function (lines) {
            if (lines) {
                var transformer = TransformerFactory_1.TransformerFactory.create(format);
                self.writer.write(outputPath, lines, transformer, opts);
            }
            if (typeof (cb) === 'function') {
                cb();
            }
        });
    };
    ;
    return Gs2File;
}());
exports.Gs2File = Gs2File;
