import {AbstractWriter} from "./AbstractWriter";
import {LSLine} from "../modeles/LSLine";
import {Transformer} from "../transformer/Transformer";
import {EOL} from "os";
import * as fs from "fs";
import {Options} from "../modeles/Options";
import {LSEntity} from "../modeles/LSEntity";
import {LSArray} from "../modeles/LSArray";
/**
 * Created by amatsegor on 5/4/17.
 */

export class FileWriter implements AbstractWriter {

    constructor() {
    }

    write(filePath: string, entities: Array<LSEntity>, transformer: Transformer, options: Options) {
        let fileContent;
        if (fs.existsSync(filePath)) {
            fileContent = fs.readFileSync(filePath, options.encoding);
        }

        const valueToInsert = this.getTransformedLines(entities, transformer);
        const output = transformer.insert(fileContent, valueToInsert, options);

        FileWriter.writeFileAndCreateDirectoriesSync(filePath, output, 'utf8');
    }

    getTransformedLines(entities: Array<LSEntity>, transformer: Transformer) {
        let valueToInsert = '';
        entities.filter(entity => !entity.isEmpty())
            .forEach((entity, index) => {
                if (entity instanceof LSLine) {
                    if (entity.isComment()) {
                        valueToInsert += transformer.transformComment(entity.getComment());
                    } else {
                        valueToInsert += transformer.transformKeyValue(entity.getKey(), entity.getValue());
                    }
                } else if (entity instanceof LSArray) {
                    valueToInsert += transformer.transformArray(entity);
                }
                if (index != entities.length - 1) {
                    valueToInsert += EOL;
                }
            });
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