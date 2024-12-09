import { Position } from "../utils/fieldUtils";
import FileUtils from "../utils/fileUtils";
import Utils from "../utils/utils";


const prep = (input: string) => {
    const lines = Utils.splitToLines(input)
    const field = lines.map(line => line.split(""))
    const xLength = field.length
    const yLength = field[0].length

    const frequencies = new Set<string>(field.flatMap(row => row)
        .filter(char => char !== "."));

    return {xLength, yLength, frequencies, field}
}

const solvePart1 = (input: string) => {
    const {xLength, yLength, frequencies, field} = prep(input)

    const antiNodes = Utils.getArrayUtils().onlyUnique(Array.from(frequencies.values())
        .map(f => Utils.getFieldUtils().getPositionsFromField(field, f))
        .flatMap(positions =>
            Utils.generateCombinationsWithoutDoubledValues(2, positions)
                .map(([p1, p2]) =>
                    ({
                        x: p1.x + (p2.x - p1.x) * 2,
                        y: p1.y + (p2.y - p1.y) * 2
                    })
                )
                .filter(pos => pos.x >= 0 && pos.x < xLength && pos.y >= 0 && pos.y < yLength)
        ))
    return antiNodes.length
}

const solvePart2 = (input: string) => {
    const {xLength, yLength, frequencies, field} = prep(input)

    const antiNodes = Utils.getArrayUtils().onlyUnique(Array.from(frequencies.values())
        .map(f => Utils.getFieldUtils().getPositionsFromField(field, f))
        .flatMap(positions =>
            Utils.generateCombinationsWithoutDoubledValues(2, positions)
                .flatMap(([p1, p2]) => {
                    let res = [];
                    let pos: Position
                    for (let i = 1; true; i++) {
                        pos = {
                            x: p1.x + (p2.x - p1.x) * i,
                            y: p1.y + (p2.y - p1.y) * i
                        }
                        if(!(pos.x >= 0 && pos.x < xLength && pos.y >= 0 && pos.y < yLength))
                            break;
                        else
                            res.push(pos)
                    }
                    return res
                })
        ))

    antiNodes.forEach(({x,y}) => field[x][y] = "#")
    return "\n" + field.map(row => row.join("")).join("\n") + "\n" + antiNodes.length
}

console.log(`Solution for Part 1:`, solvePart1(FileUtils.readFile(false)))
console.log(`Solution for Part 2:`, solvePart2(FileUtils.readFile(false)))
