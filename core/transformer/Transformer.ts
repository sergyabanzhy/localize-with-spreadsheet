import {Options} from "../modeles/Options";
import {LSArray} from "../modeles/LSArray";
/**
 * Created by amatsegor on 5/4/17.
 */

export abstract class Transformer {
    abstract transformArray(array: LSArray): string;

    abstract transformComment(comment: string): string;

    abstract transformKeyValue(key: string, value: string): string;

    abstract insert(input: string, newValues: string, options: Options): string;
}