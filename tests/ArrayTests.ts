import {GSReader} from "../core/reader/GSReader";

var LSArray = require('../core/modeles/LSArray').LSArray;

/**
 * Created by amatsegor on 5/4/17.
 */

export function testArray(test) {
    var reader = new GSReader('api_key', '*');

    var rawWorksheet = [{value: 'Key', row: 1, col: 1},
        {value: 'Value_fr', row: 1, col: 2},
        {value: 'Value_nl', row: 1, col: 3},

        {value: '[test-array]', row: 2, col: 1},

        {value: 'key1', row: 3, col: 1},
        {value: 'La valeur 1', row: 3, col: 2},
        {value: 'De valuue 1', row: 3, col: 3},

        {value: 'key2', row: 4, col: 1},
        {value: 'La vale de la clé 2', row: 4, col: 2},
        {value: 'De valuee van key 2', row: 4, col: 3},
        {value: '[/array]', row: 5, col: 1}];

    var result = reader.extractFromWorksheet(rawWorksheet, 'Key', 'Value_fr');

    test.equal(1, result.length);
    let firstResult = result[0];
    if (firstResult instanceof LSArray) {
        test.equal(firstResult.array.length, 2);
        test.equal('test-array', firstResult.key);
        test.done();
    } else {
        throw new Error("Result isn't an array");
    }

}