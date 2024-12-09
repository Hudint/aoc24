import ArrayUtils from "./arrayUtils";
import FieldUtils from "./fieldUtils";
import FileUtils from "./fileUtils";
import StringUtils from "./stringUtils";


export default class Utils {

    private constructor() {
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



    static getArrayUtils(){
        return ArrayUtils
    }

    static getFieldUtils(){
        return FieldUtils
    }

    static getFileUtils(){
        return FileUtils
    }

    static getStringUtils(){
        return StringUtils
    }
}