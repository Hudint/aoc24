import { Dir } from "fs"

export interface Position {
    x: number,
    y: number
}

export enum Direction{
    UP,
    RIGHT,
    DOWN,
    LEFT
} 

export const DirectionsOffsets: {[key in Direction]: Position} = {
    [Direction.UP]: {x: -1, y: 0},
    [Direction.RIGHT]: {x: 0, y: 1},
    [Direction.DOWN]: {x: 1, y: 0},
    [Direction.LEFT]: {x: 0, y: -1},
}

export default class FieldUtils {
    
    private constructor() {}

    static getDirections() : Direction[] {
        return Object.keys(Direction)
            .map(d => Number.parseInt(d))
            .filter(d => !isNaN(d))
    }

    static operation(pos1: Position, pos2: Position, op: (n1: number, n2: number) => number): Position {
        return {
            x: op(pos1.x, pos2.x),
            y: op(pos1.y, pos2.y)
        }
    }

    static add(pos1: Position, pos2: Position){
        return this.operation(pos1, pos2, (n1,n2) => n1+n2)
    }

    static linesToField(lines: string[]) {
        return lines.map(row => row.split("").map(n => Number.parseInt(n)))
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

    static validPos(fields: any[][], pos: [number, number]) {
        return pos[0] >= 0 && pos[0] < fields.length && pos[1] >= 0 && pos[1] < fields[pos[0]].length
    }

    static validPosition(fields: any[][], position: Position) {
        return this.validPos(fields, [position.x, position.y])
    }
}