"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COMMENT_STARTERS = ['//', '#'];
var LSLine = (function () {
    function LSLine(key, value) {
        if (value === void 0) { value = ""; }
        if (!key) {
            key = '';
        }
        key = key.toString();
        this._isComment = LSLine.checkIsComment(key);
        this._key = key || '';
        this._value = value || '';
        if (this._isComment) {
            this._key = LSLine.normalizeComment(key);
        }
    }
    LSLine.checkIsComment = function (val) {
        for (var i = 0; i < COMMENT_STARTERS.length; i++) {
            var commentStarter = COMMENT_STARTERS[i];
            if (val.indexOf(commentStarter) === 0) {
                return true;
            }
        }
        return false;
    };
    ;
    LSLine.normalizeComment = function (val) {
        for (var i = 0; i < COMMENT_STARTERS.length; i++) {
            var commentStarter = COMMENT_STARTERS[i];
            var index = val.indexOf(commentStarter);
            if (index === 0) {
                return val.substr(commentStarter.length, val.length - commentStarter.length).trim();
            }
        }
        return val;
    };
    LSLine.prototype.isEmpty = function () {
        return !this._isComment && !this._key;
    };
    LSLine.prototype.isComment = function () {
        return this._isComment;
    };
    LSLine.prototype.getComment = function () {
        return this._key;
    };
    LSLine.prototype.getKey = function () {
        return this._key;
    };
    LSLine.prototype.getValue = function () {
        return this._value;
    };
    return LSLine;
}());
exports.LSLine = LSLine;
