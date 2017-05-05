"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
/**
 * Created by amatsegor on 5/4/17.
 */
var JsonTransformer = (function () {
    function JsonTransformer() {
    }
    JsonTransformer.prototype.transformComment = function (comment) {
        return "";
    };
    JsonTransformer.prototype.transformKeyValue = function (key, value) {
        var normalizedValue = value.replace(/%newline%/gi, "\\n");
        normalizedValue = normalizedValue.replace(/"/gi, '\\"');
        normalizedValue = normalizedValue.replace(/%([@df])/gi, '%$1');
        normalizedValue = normalizedValue.replace(/%s/gi, "%@");
        return '  "' + key + '" : "' + normalizedValue + '",';
    };
    JsonTransformer.prototype.insert = function (input, newValues, options) {
        newValues = newValues.substring(0, newValues.length - 1);
        return os_1.EOL + '{' + os_1.EOL + newValues + os_1.EOL + '}';
    };
    return JsonTransformer;
}());
exports.JsonTransformer = JsonTransformer;
