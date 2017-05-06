"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GoogleSpreadsheet = require("google-spreadsheet");
var Q = require("q");
var WorksheetReader_1 = require("./WorksheetReader");
var LSLine_1 = require("../modeles/LSLine");
var LSArray_1 = require("../modeles/LSArray");
//language=RegExp
var arrayStartRegex = new RegExp("\\[[\\w\\-_]+]");
//language=RegExp
var arrayEndRegex = new RegExp("\\[/\\S+]");
var GSReader = (function () {
    function GSReader(spreadsheetKey, sheetsFilter) {
        this.isFetching = false;
        this.fetchedWorksheets = null;
        this.sheet = new GoogleSpreadsheet(spreadsheetKey);
        this.sheetsFilter = sheetsFilter;
        this.fetchDeferred = Q.defer();
    }
    ;
    GSReader.prototype.fetchAllCells = function () {
        var self = this;
        if (self.fetchedWorksheets == null) {
            if (!self.isFetching) {
                self.isFetching = true;
                self.sheet.getInfo(function (err, data) {
                    if (err) {
                        console.error('Error while fetching the Spreadsheet (' + err + ')');
                        console.warn('WARNING! Check that your spreadsheet is "Published" in "File > Publish to the web..."');
                        self.fetchDeferred.reject(err);
                    }
                    else {
                        var worksheetReader = new WorksheetReader_1.WorksheetReader(self.sheetsFilter, data.worksheets);
                        worksheetReader.read(function (fetchedWorksheets) {
                            self.fetchedWorksheets = fetchedWorksheets;
                            self.fetchDeferred.resolve(self.fetchedWorksheets);
                        });
                    }
                });
            }
            return this.fetchDeferred.promise;
        }
        else {
            return self.fetchedWorksheets;
        }
    };
    ;
    GSReader.prototype.select = function (sheets, keyCol, valCol, cb) {
        var deferred = Q.defer();
        var self = this;
        Q.when(self.fetchAllCells(), function (worksheets) {
            var extractedLines = self.extractFromRawData(worksheets, keyCol, valCol);
            deferred.resolve(extractedLines);
        }).fail(function (error) {
            console.error(error);
        });
        return deferred.promise;
    };
    ;
    GSReader.prototype.extractFromRawData = function (rawWorksheets, keyCol, valCol) {
        var _this = this;
        var extractedLines = [];
        rawWorksheets.forEach(function (worksheet) {
            var extracted = _this.extractFromWorksheet(worksheet, keyCol, valCol);
            extractedLines.push.apply(extractedLines, extracted);
        });
        return extractedLines;
    };
    ;
    GSReader.prototype.extractFromWorksheet = function (rawWorksheet, keyCol, valCol) {
        var results = [];
        var rows = this.flattenWorksheet(rawWorksheet);
        var headers = rows[0];
        var isInArray = false;
        var arrayName = "", array = [];
        if (headers) {
            var keyIndex = -1, valIndex = -1, i;
            for (i = 0; i < headers.length; i++) {
                var value = headers[i];
                if (value == keyCol) {
                    keyIndex = i;
                }
                if (value == valCol) {
                    valIndex = i;
                }
            }
            rows.filter(function (row) { return row; }).forEach(function (row) {
                var keyValue = row[keyIndex];
                var valValue = row[valIndex];
                if (!keyValue)
                    keyValue = "";
                if (keyValue.match(arrayStartRegex)) {
                    arrayName = keyValue.substring(1, keyValue.indexOf("]"));
                    isInArray = true;
                }
                else if (keyValue.match(arrayEndRegex)) {
                    results.push(new LSArray_1.LSArray(arrayName, array));
                    arrayName = "";
                    isInArray = false;
                }
                else if (isInArray) {
                    array.push(new LSLine_1.LSLine(keyValue, valValue));
                }
                else {
                    results.push(new LSLine_1.LSLine(keyValue, valValue));
                }
            });
        }
        return results;
    };
    ;
    GSReader.prototype.flattenWorksheet = function (rawWorksheet) {
        var rows = [];
        var lastRowIndex = 1;
        for (var i = 0; i < rawWorksheet.length; i++) {
            var cell = rawWorksheet[i];
            //detect empty line
            var rowIndex = cell.row;
            var diffWithLastRow = rowIndex - lastRowIndex;
            if (diffWithLastRow > 1) {
                for (var j = 0; j < diffWithLastRow - 1; j++) {
                    var newRow = rows[lastRowIndex + j] = [];
                    newRow[cell.col - 1] = '';
                }
            }
            lastRowIndex = rowIndex;
            var row = rows[cell.row - 1];
            if (!row) {
                row = rows[cell.row - 1] = [];
            }
            row[cell.col - 1] = cell.value;
        }
        return rows;
    };
    ;
    GSReader.isAllSheets = function (sheet) {
        if (!sheet || sheet == '*') {
            return true;
        }
        return false;
    };
    ;
    GSReader.shouldUseWorksheet = function (selectedSheets, title, index) {
        if (GSReader.isAllSheets(selectedSheets)) {
            return true;
        }
        else {
            var selectedArray = GSReader.forceArray(selectedSheets);
            for (var i = 0; i < selectedArray.length; i++) {
                var a = selectedArray[i];
                if (typeof (a) == "number" && index == a) {
                    return true;
                }
                else if (typeof (a) == "string" && title == a) {
                    return true;
                }
            }
            return false;
        }
    };
    ;
    return GSReader;
}());
GSReader.forceArray = function (val) {
    if (Array.isArray(val))
        return val;
    if (!val)
        return [];
    return [val];
};
exports.GSReader = GSReader;
