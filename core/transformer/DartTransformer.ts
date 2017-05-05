import {Transformer} from "./Transformer";
import {EOL} from "os";
/**
 * Created by amatsegor on 5/4/17.
 */

export class DartTransformer implements Transformer {
    transformComment(comment) {
        return "  // " + comment;
    }

    transformKeyValue(key, value) {
        var normalizedValue = value.replace(/%newline%/gi, "\\n");
        normalizedValue = normalizedValue.replace(/"/gi, '\\"');
        normalizedValue = normalizedValue.replace(/%([@df])/gi, '%$1');
        normalizedValue = normalizedValue.replace(/%s/gi, "%@");

        return '  "' + key + '" : "' + normalizedValue + '",';
    }


    static AUTOGENERATED_TAG: '// AUTO-GENERATED';

    insert(input, newValues, options) {
        if (!input) {
            input = '';
        }

        var generatedIndex = input.indexOf(DartTransformer.AUTOGENERATED_TAG);
        if (generatedIndex >= 0) {
            input = input.substr(0, generatedIndex);
        }

        var header = options && options.header ? options.header : '';
        var footer = options && options.footer ? options.footer : '';

        var output = input + DartTransformer.AUTOGENERATED_TAG + EOL +
            header +
            '{' + EOL +
            newValues + EOL
            + '};' + footer;

        return output;
    }
}
;