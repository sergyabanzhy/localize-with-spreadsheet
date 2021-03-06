import {EOL} from "os";
import {Transformer} from "./Transformer";
import {LSArray} from "../modeles/LSArray";
/**
 * Created by amatsegor on 5/4/17.
 */

export class JsonTransformer implements Transformer {
    transformArray(array: LSArray): string {
        return undefined;
    }

    transformComment(comment) {
        return "";
    }

    transformKeyValue(key, value) {
        let normalizedValue = value.replace(/%newline%/gi, "\\n");
        normalizedValue = normalizedValue.replace(/"/gi, '\\"');
        normalizedValue = normalizedValue.replace(/%([@df])/gi, '%$1');
        normalizedValue = normalizedValue.replace(/%s/gi, "%@");

        return '  "' + key + '" : "' + normalizedValue + '",';
    }

    static AUTOGENERATED_TAG = '';

    insert(input, newValues, options) {
        newValues = newValues.substring(0, newValues.length - 1);

        return EOL + '{' + EOL + newValues + EOL + '}';
    }
}