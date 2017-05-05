"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LSLine_1 = require("../modeles/LSLine");
/**
 * Created by amatsegor on 5/4/17.
 */
var FakeReader = (function () {
    function FakeReader(array) {
        this.index = 0;
        this.array = array;
    }
    FakeReader.prototype.select = function (sheets, keyCol, valCol, callback) {
        var self = this;
        var target = [];
        this.array.forEach(function (key) {
            var options = self.array[key];
            target.push(new LSLine_1.LSLine(options[keyCol], options[valCol]));
        });
        callback(target);
    };
    return FakeReader;
}());
exports.FakeReader = FakeReader;
