import {Reader} from "./Reader";
import {LSLine} from "../modeles/LSLine";
import GoogleSpreadsheet = require('google-spreadsheet');
/**
 * Created by amatsegor on 5/4/17.
 */

export class FakeReader implements Reader {

    array: string[];
    index = 0;

    constructor(array: string[]) {
        this.array = array;
    }

    select(sheets: GoogleSpreadsheet[], keyCol: string, valCol: string, callback: Function) {
        var self = this;
        var target = [];

        this.array.forEach(function (key) {
            let options = self.array[key];
            target.push(new LSLine(options[keyCol], options[valCol]));
        });

        callback(target);
    }

}