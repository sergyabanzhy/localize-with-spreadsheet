import {Options} from "../modeles/Options";
/**
 * Created by amatsegor on 5/4/17.
 */

export abstract class Transformer {
    abstract transformComment(comment: string): string;

    abstract transformKeyValue(key: string, value: string): string;

    abstract insert(input: string, newValues: string, options: Options): string;
}