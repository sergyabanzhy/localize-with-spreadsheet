"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DotNetTransformer_1 = require("./DotNetTransformer");
var DartTemplateTransformer_1 = require("./DartTemplateTransformer");
var DartTransformer_1 = require("./DartTransformer");
var JsonTransformer_1 = require("./JsonTransformer");
var IOSTransformer_1 = require("./IOSTransformer");
var AndroidTransformer_1 = require("./AndroidTransformer");
/**
 * Created by amatsegor on 5/4/17.
 */
var TransformerFactory = (function () {
    function TransformerFactory() {
    }
    TransformerFactory.create = function (format) {
        switch (format) {
            default:
            case "android": {
                return new AndroidTransformer_1.AndroidTransformer();
            }
            case "ios": {
                return new IOSTransformer_1.iOSTransformer();
            }
            case "json": {
                return new JsonTransformer_1.JsonTransformer();
            }
            case "dart": {
                return new DartTransformer_1.DartTransformer();
            }
            case "dartTemplate": {
                return new DartTemplateTransformer_1.DartTemplateTransformer();
            }
            case ".net": {
                return new DotNetTransformer_1.DotNetTransformer();
            }
        }
    };
    return TransformerFactory;
}());
exports.TransformerFactory = TransformerFactory;
