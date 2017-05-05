import {LSEntity} from "./LSEntity";
const COMMENT_STARTERS = ['//', '#'];

export class LSLine implements LSEntity {

    _key: string;
    _value: string;
    _isComment: boolean;

    constructor(key: string, value: string = "") {
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

    static checkIsComment(val: string) {
        for (let i = 0; i < COMMENT_STARTERS.length; i++) {
            const commentStarter = COMMENT_STARTERS[i];
            if (val.indexOf(commentStarter) === 0) {
                return true;
            }
        }
        return false;
    };

    static normalizeComment(val: string) {
        for (let i = 0; i < COMMENT_STARTERS.length; i++) {
            const commentStarter = COMMENT_STARTERS[i];
            const index = val.indexOf(commentStarter);
            if (index === 0) {
                return val.substr(commentStarter.length, val.length - commentStarter.length).trim();
            }
        }
        return val;
    }

    isEmpty() {
        return !this._isComment && !this._key;
    }

    isComment() {
        return this._isComment;
    }

    getComment() {
        return this._key;
    }

    getKey() {
        return this._key;
    }

    getValue() {
        return this._value;
    }

}