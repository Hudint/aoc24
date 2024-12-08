import getCallerFile from "get-caller-file"
import * as sea from "node:sea";
import path from "path";
import {readFileSync} from "fs";

export interface Position {
    x: number,
    y: number
}

export default class Utils {
    private static testing: boolean

    private constructor() {
    }

    static setTesting(testing: boolean) {
        this.testing = testing;
    }

    static readFile(testing: boolean = this.testing) {
        const file = getCallerFile()
            .split(path.sep)
            .slice(0, -1)
            .concat(testing ? "testinput.txt" : "input.txt")
            .join(path.sep);
        // console.log(`Reading File ${file}...`)
        return readFileSync(file, {encoding: "utf-8"})
            .toString()
    }

    static splitToLines(str: string) {
        return str.split(str.includes("\r\n") ? "\r\n" : "\n");
    }

    static splitSecondToNumbers(line: string, delimiter: string = ":") {
        return line.split(delimiter)[1]
            .trim()
            .split(" ")
            .filter(i => i.length > 0)
            .map(i => Number.parseInt(i))
    }

    static adding(prev, c) {
        return prev + c
    }

    static splitTrim(s: string, delimiter: string) {
        return s.split(delimiter)
            .map(s => s.trim())
            .filter(s => s.length > 0)
    }

    static removeIndecesFromArray<T>(arr: T[], ix: number[]) {
        let copy = [...arr];
        [...ix].sort()
            .forEach((i, r) => copy.splice(i - r, 1))
        return copy
    }

    static matches(input: string, regex: RegExp): RegExpMatchArray[] {
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

    static objectEquals(a, b) {
        let entries = Object.entries(a);
        return entries.length === Object.entries(b).length
            && entries.every(([key, value]) => b[key] === value)
    }

    static getMiddleItem<T>(arr: T[]) {
        let index = Math.trunc(arr.length / 2)
        return arr[index]
    }

    private static arrOp(ar1: number[], ar2: number[], op: (n: number, n2: number) => number): number[] {
        if (ar1.length != ar2.length)
            throw new Error("Arrays dont have the same size! " + ar1.length + "-" + ar2.length)
        let result = [];
        for (let i = 0; i < ar1.length; i++) {
            result[i] = op(ar1[i], ar2[i]);
        }
        return result;
    }

    static addOpArray(ar1: number[], ar2: number[]) {
        return this.arrOp(ar1, ar2, (n, n2) => n + n2)
    }

    static substractOpArray(ar1: number[], ar2: number[]) {
        return this.arrOp(ar1, ar2, (n, n2) => n - n2)
    }

    static multiplyOpArray(ar: number[], factor: number) {
        return this.arrOp(ar, Array(ar.length)
            .fill(factor), (n, n2) => n * n2)
    }

    static validPosition(fields: any[][], pos: [number, number]) {
        return pos[0] >= 0 && pos[0] < fields.length && pos[1] >= 0 && pos[1] < fields[pos[0]].length
    }

    static generateCombinations<T>(length: number, possibleValues: T[]) {
        if (length <= 0)
            return [];

        const result: T[][] = [];

        function addValue(values: T[]) {
            if (values.length === length)
                result.push(values)
            else {
                possibleValues.forEach(value => addValue([...values, value]))
            }
        }

        addValue([])
        return result;
    }

    static generateCombinationsWithoutDoubledValues<T>(length: number, possibleValues: T[]) {
        if (length <= 0)
            return [];

        const result: T[][] = [];

        function addValue(values: T[], possibleValues: T[]) {
            if (values.length === length)
                result.push(values)
            else {
                possibleValues.forEach((value, i) => addValue([...values, value], possibleValues.toSpliced(i, 1)))
            }
        }

        addValue([], possibleValues)
        return result;
    }

    static getPositionsFromField<T>(field: T[][], search: T) {
        let result: Position[] = []
        field.forEach((row, x) => {
            row.forEach((col, y) => {
                if (col === search)
                    result.push({x, y})
            })
        })
        return result
    }

    static onlyUnique<T>(arr: T[]){
        let result: T[] = [];
        arr.forEach(v => {
            if(!result.some(r => this.objectEquals(r, v)))
                result.push(v)
        })
        return result;
    }
}
