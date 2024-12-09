import getCallerFile from "get-caller-file"
import * as sea from "node:sea";
import path from "path";
import {readFileSync} from "fs";

export default class FileUtils {
    private static testing: boolean

    private constructor() {}

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
}