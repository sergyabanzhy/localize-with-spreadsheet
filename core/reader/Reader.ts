/**
 * Created by amatsegor on 5/4/17.
 */
import GoogleSpreadsheet = require('google-spreadsheet');

export interface Reader {
    select(sheets: GoogleSpreadsheet[], keyCol: string, valCol: string, callback: Function);
}