"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by amatsegor on 5/4/17.
 */
var LSArray = (function () {
    function LSArray(key, array) {
        this.key = key;
        this.array = array;
    }
    LSArray.prototype.isEmpty = function () {
        return this.array.length == 0;
    };
    LSArray.prototype.isComment = function () {
        return false;
    };
    return LSArray;
}());
exports.LSArray = LSArray;
