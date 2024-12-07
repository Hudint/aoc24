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

    static readFile(testing: boolean = this.testing){
        const file = getCallerFile()
            .split(path.sep)
            .slice(0, -1)
            .concat(this.testing ? "testinput.txt" : "input.txt")
            .join(path.sep);
        console.log(`Reading File ${file}...`)
        let result = readFileSync(file, {encoding: "utf-8"}).toString()
        console.log("Done!")
        return result
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

    static adding(prev, c){
        return prev+c
    }

    static splitTrim(s: string, delimiter: string){
        return s.split(delimiter).map(s => s.trim()).filter(s => s.length > 0)
    }

    static removeIndecesFromArray<T>(arr: T[], ix: number[]){
        let copy = [...arr];
        [...ix].sort().forEach((i, r) => copy.splice(i - r, 1))
        return copy
    }

    static matches(input: string, regex: RegExp) : RegExpMatchArray[] {
        let matches: RegExpMatchArray[] = [];
        let current: RegExpMatchArray | null;
        while (current = regex.exec(input)) {
            matches.push(current);
        }
        return matches;
    }

    static arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    static getMiddleItem<T>(arr: T[]){
        let index = Math.trunc(arr.length/2)
        return arr[index]
    }

    private static arrOp(ar1: number[], ar2: number[], op: (n: number, n2: number) => number) : number[] {
        if(ar1.length != ar2.length)
            throw new Error("Arrays dont have the same size! " + ar1.length + "-" + ar2.length)
        let result = [];
        for(let i = 0; i < ar1.length; i++){
            result[i] = op(ar1[i], ar2[i]);
        }
        return result;
    }

    static addOpArray(ar1: number[], ar2: number[]){
        return this.arrOp(ar1, ar2, (n, n2) => n + n2)
    }

    static substractOpArray(ar1: number[], ar2: number[]){
        return this.arrOp(ar1, ar2, (n, n2) => n - n2)
    }

    static multiplyOpArray(ar: number[], factor: number) {
        return this.arrOp(ar, Array(ar.length).fill(factor), (n,n2) => n*n2)
    }

    static validPosition(fields: any[][], pos: [number, number]){
        return pos[0] >= 0 && pos[0] < fields.length && pos[1] >= 0 && pos[1] < fields[pos[0]].length
    }
}