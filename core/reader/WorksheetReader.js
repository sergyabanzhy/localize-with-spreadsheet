"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GSReader_1 = require("./GSReader");
var WorksheetReader = (function () {
    function WorksheetReader(filterSheets, worksheets) {
        this.index = 0;
        this.filterSheets = filterSheets;
        this.worksheets = worksheets;
        this.index = 0;
        this.data = [];
    }
    ;
    WorksheetReader.prototype.read = function (cb) {
        this.next(cb);
    };
    ;
    WorksheetReader.prototype.next = function (cb) {
        var self = this;
        if (this.index < this.worksheets.length) {
            var index = this.index++;
            var currentWorksheet = this.worksheets[index];
            if (GSReader_1.GSReader.shouldUseWorksheet(this.filterSheets, currentWorksheet.title, index)) {
                currentWorksheet.getCells(currentWorksheet.id, function (err, cells) {
                    if (!err) {
                        self.data.push(cells);
                    }
                    self.next(cb);
                });
            }
            else {
                this.next(cb);
            }
        }
        else {
            cb(this.data);
        }
    };
    ;
    return WorksheetReader;
}());
exports.WorksheetReader = WorksheetReader;
