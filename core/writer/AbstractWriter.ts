import {LSLine} from "../modeles/LSLine";
import {Transformer} from "../transformer/Transformer";
import {Options} from "../modeles/Options";
import {LSEntity} from "../modeles/LSEntity";
/**
 * Created by amatsegor on 5/4/17.
 */

export interface AbstractWriter {
    write(filePath: string, lines: Array<LSEntity>, transformer: Transformer, options: Options);
}