import {GSReader} from './core/reader/GSReader';
import {Options} from './core/modeles/Options';
import {Reader} from "./core/reader/Reader";
import {FileWriter} from './core/writer/FileWriter';
import {AbstractWriter} from "./core/writer/AbstractWriter";
import {TransformerFactory} from "./core/transformer/TransformerFactory";

export class Gs2File {
    reader: Reader;
    writer: AbstractWriter;
    opts: Options;

    defaultValueCol = "";
    defaultKeyCol = "";
    defaultFormat = "";
    defaultEncoding = "";

    constructor(reader: Reader, writer: AbstractWriter) {
        this.reader = reader;
        this.writer = writer;
    }

    static fromGoogleSpreadsheet(spreadsheetKey: string, sheets: string): Gs2File {
        let fileWriter = new FileWriter();
        return new Gs2File(new GSReader(spreadsheetKey, sheets), fileWriter);
    };

    setValueCol = function (valueCol) {
        this._defaultValueCol = valueCol;
    };

    setKeyCol = function (keyCol) {
        this._defaultKeyCol = keyCol;
    };

    setFormat = function (format) {
        this._defaultFormat = format;
    };

    setEncoding = function (encoding) {
        this._defaultEncoding = encoding;
    };

    save(outputPath, opts, cb) {
        console.log('saving ' + outputPath);
        const self = this;

        this.opts = opts || {};

        let keyCol = opts.keyCol,
            valueCol = opts.valueCol,
            format = opts.format,
            encoding = opts.encoding;

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
                    const transformer = TransformerFactory.create(format);
                    self.writer.write(outputPath, lines, transformer, opts);
                }

                if (typeof(cb) === 'function') {
                    cb();
                }
            });

    };

}