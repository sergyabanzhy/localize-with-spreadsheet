import {AbstractWriter} from "./AbstractWriter";
import {LSLine} from "../modeles/LSLine";
import {Transformer} from "../transformer/Transformer";
import {EOL} from "os";
import * as fs from "fs";
import {Options} from "../modeles/Options";
/**
 * Created by amatsegor on 5/4/17.
 */

export class FileWriter implements AbstractWriter {

    constructor() {
    }

    write(filePath: string, lines: Array<LSLine>, transformer: Transformer, options: Options) {
        var fileContent;
        if (fs.existsSync(filePath)) {
            fileContent = fs.readFileSync(filePath, options.encoding);
        }

        var valueToInsert = this.getTransformedLines(lines, transformer);

        var output = transformer.insert(fileContent, valueToInsert, options);

        FileWriter.writeFileAndCreateDirectoriesSync(filePath, output, 'utf8');
    }

    getTransformedLines(lines: Array<LSLine>, transformer: Transformer) {
        var valueToInsert = '';
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (!line.isEmpty()) {
                if (line.isComment()) {
                    valueToInsert += transformer.transformComment(line.getComment());
                } else {
                    valueToInsert += transformer.transformKeyValue(line.getKey(), line.getValue());
                }
            }
            if (i != lines.length - 1) {
                valueToInsert += EOL;
            }
        }

        return valueToInsert;
    }

    //https://gist.github.com/jrajav/4140206
    static writeFileAndCreateDirectoriesSync(filepath: string, content: string, encoding: string) {
        var mkpath = require('mkpath');
        var path = require('path');

        var dirname = path.dirname(filepath);
        mkpath.sync(dirname);

        fs.writeFileSync(filepath, content, encoding);
    };
}