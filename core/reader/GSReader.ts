/**
 * Created by amatsegor on 5/4/17.
 */
import Line = require('../modeles/LSLine.js');
import GoogleSpreadsheet = require('google-spreadsheet');
import Q = require('q');
import {WorksheetReader} from "./WorksheetReader";
import {LSLine} from "../modeles/LSLine";
import {LSArray} from "../modeles/LSArray";
import {Reader} from "./Reader";

const EOL = require('os').EOL;
//language=RegExp
const arrayStartRegex = new RegExp("\\[[\\w\\-_]+]");
//language=RegExp
const arrayEndRegex = new RegExp("\\[/\\S+]");

export class GSReader implements Reader{

    sheet: GoogleSpreadsheet;
    sheetsFilter: string;
    isFetching = false;
    fetchedWorksheets = null;
    fetchDeferred: any;

    constructor(spreadsheetKey: string, sheetsFilter: string) {
        this.sheet = new GoogleSpreadsheet(spreadsheetKey);
        this.sheetsFilter = sheetsFilter;
        this.fetchDeferred = Q.defer();
    };

    fetchAllCells() {
        var self = this;

        if (self.fetchedWorksheets == null) {

            if (!self.isFetching) {
                self.isFetching = true;

                self.sheet.getInfo(function (err, data) {
                    if (err) {
                        console.error('Error while fetching the Spreadsheet (' + err + ')');
                        console.warn('WARNING! Check that your spreadsheet is "Published" in "File > Publish to the web..."');
                        self.fetchDeferred.reject(err);
                    } else {
                        var worksheetReader = new WorksheetReader(this._sheetsFilter, data.worksheets);
                        worksheetReader.read(function (fetchedWorksheets) {
                            self.fetchedWorksheets = fetchedWorksheets;
                            self.fetchDeferred.resolve(self.fetchedWorksheets);
                        });
                    }
                });
            }

            return this.fetchDeferred.promise;
        } else {
            return self.fetchedWorksheets;
        }
    };

    select(keyCol, valCol) {
        var deferred = Q.defer();
        var self = this;

        Q.when(self.fetchAllCells(), function (worksheets) {
            var extractedLines = this.extractFromRawData(worksheets, keyCol, valCol);
            deferred.resolve(extractedLines);
        }).fail(function (error) {
            //console.error('Cannot fetch data');
        });

        return deferred.promise;
    };

    extractFromRawData(rawWorksheets, keyCol, valCol) {
        var extractedLines = [];
        for (var i = 0; i < rawWorksheets.length; i++) {
            var extracted = this.extractFromWorksheet(rawWorksheets[i], keyCol, valCol);
            extractedLines.push.apply(extractedLines, extracted);
        }

        return extractedLines;
    };

    extractFromWorksheet(rawWorksheet, keyCol, valCol) {
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
            for (i = 1; i < rows.length; i++) {
                var row = rows[i];
                if (row) {
                    var keyValue = row[keyIndex];
                    var valValue = row[valIndex];

                    if (keyValue.match(arrayStartRegex)) {
                        arrayName = keyValue.substring(1, keyValue.indexOf("]"));
                        isInArray = true;
                    } else if (keyValue.match(arrayEndRegex)) {
                        results.push(new LSArray(arrayName, array));
                        arrayName = "";
                        isInArray = false;
                    } else {
                        array.push(new LSLine(keyValue, valValue));
                    }
                }
            }
        }

        return results;
    };

    flattenWorksheet(rawWorksheet) {
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

    static isAllSheets(sheet) {
        if (!sheet || sheet == '*') {
            return true;
        }
        return false;
    };

    static shouldUseWorksheet(selectedSheets, title, index) {
        if (GSReader.isAllSheets(selectedSheets)) {
            return true;
        } else {
            var selectedArray = GSReader.forceArray(selectedSheets);
            for (var i = 0; i < selectedArray.length; i++) {
                var a = selectedArray[i];

                if (typeof(a) == "number" && index == a) {
                    return true;
                } else if (typeof(a) == "string" && title == a) {
                    return true;
                }
            }
            return false;
        }
    };

    static forceArray = function (val) {
        if (Array.isArray(val)) return val;
        if (!val) return [];
        return [val];
    };

}