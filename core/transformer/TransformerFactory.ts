import {DotNetTransformer} from "./DotNetTransformer";
import {DartTemplateTransformer} from "./DartTemplateTransformer";
import {DartTransformer} from "./DartTransformer";
import {JsonTransformer} from "./JsonTransformer";
import {iOSTransformer} from "./IOSTransformer";
import {AndroidTransformer} from "./AndroidTransformer";
import {Transformer} from "./Transformer";
/**
 * Created by amatsegor on 5/4/17.
 */

export abstract class TransformerFactory {
    static create(format: string): Transformer {
        switch (format) {
            default:
            case "android": {
                return new AndroidTransformer();
            }
            case "ios": {
                return new iOSTransformer();
            }
            case "json": {
                return new JsonTransformer();
            }
            case "dart": {
                return new DartTransformer();
            }
            case "dartTemplate": {
                return new DartTemplateTransformer();
            }
            case ".net": {
                return new DotNetTransformer();
            }
        }
    }
}