import getCallerFile from "get-caller-file"
import path from "path";
import {readFileSync} from "fs";


export default class Utils{
    private static testing: boolean
    private constructor() {
    }

    static setTesting(testing: boolean){
        this.testing = testing;
    }

    static readFile(){
        const file = getCallerFile()
            .split(path.sep)
            .slice(0, -1)
            .concat(this.testing ? "testinput.txt" : "input.txt")
            .join(path.sep);
        console.log(`Reading File ${file}...`)
        return readFileSync(file, {encoding: "utf-8"}).toString()
    }

    static splitToLines(str: string){
        return str.split(str.includes("\r\n") ? "\r\n" : "\n");
    }

    static splitSecondToNumbers(line: string, delimiter: string = ":"){
        return line.split(delimiter)[1]
            .trim()
            .split(" ")
            .filter(i => i.length > 0)
            .map(i => Number.parseInt(i))
    }

    //

    static adding(prev, c){
        return prev+c
    }

    static splitTrim(s: string, delimiter: string){
        return s.split(delimiter).map(s => s.trim()).filter(s => s.length > 0)
    }
}