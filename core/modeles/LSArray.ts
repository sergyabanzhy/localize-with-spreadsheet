import {LSLine} from "./LSLine";
import {LSEntity} from "./LSEntity";
/**
 * Created by amatsegor on 5/4/17.
 */

export class LSArray implements LSEntity{

    key: string;
    array: Array<LSLine>;

    constructor(key: string, array: Array<LSLine>){
        this.key = key;
        this.array = array;
    }

    isEmpty(): boolean {
        return this.array.length == 0;
    }

    isComment(): boolean {
        return false;
    }
}
