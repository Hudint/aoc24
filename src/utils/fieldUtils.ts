
export interface Position {
    x: number,
    y: number
}

export default class FieldUtils {

    private constructor() {}

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