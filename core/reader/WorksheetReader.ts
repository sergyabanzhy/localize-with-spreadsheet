/**
 * Created by amatsegor on 5/4/17.
 */
import GoogleSpreadsheet = require('google-spreadsheet');
import SpreadsheetCell = require('google-spreadsheet');
import {GSReader} from "./GSReader";

export class WorksheetReader {

    worksheets: GoogleSpreadsheet;
    index = 0;
    filterSheets: string;
    data: SpreadsheetCell[];

    constructor(filterSheets, worksheets) {
        this.filterSheets = filterSheets;
        this.worksheets = worksheets;
        this.index = 0;

        this.data = [];
    };

    read(cb: Function) {
        this.next(cb);
    };

    next(cb: Function) {
        var self = this;

        if (this.index < this.worksheets.length) {

            var index = this.index++;
            var currentWorksheet = this.worksheets[index];
            if (GSReader.shouldUseWorksheet(this.filterSheets, currentWorksheet.title, index)) {
                currentWorksheet.getCells(currentWorksheet.id, function (err, cells) {
                    if (!err) {
                        self.data.push(cells);
                    }
                    self.next(cb);
                });
            } else {
                this.next(cb);
            }
        } else {
            cb(this.data);
        }
    };
}