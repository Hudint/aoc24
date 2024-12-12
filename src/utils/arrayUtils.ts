import Utils from "./utils";


export default class ArrayUtils {
    private constructor() {}

    static removeIndecesFromArray<T>(arr: T[], ix: number[]) {
        let copy = [...arr];
        [...ix].sort()
            .forEach((i, r) => copy.splice(i - r, 1))
        return copy
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

    static onlyUnique<T>(arr: T[]){
        let result: T[] = [];
        arr.forEach(v => {
            if(!result.some(r => Utils.objectEquals(r, v)))
                result.push(v)
        })
        return result;
    }

    static findIndexFrom<T>(arr: T[], fnc: (value: T)=>boolean, start: number = 0, inc: number = 1){
        for(let i = start; i < arr.length && i >= 0; i+=inc){
            if(fnc(arr[i]))
                return i
        }
        return -1
    }

    static containsObjectEquals<T>(arr: T[], value: T){
        return this.findIndexFrom(arr, v => Utils.objectEquals(v, value)) !== -1
    }
}