import { utimes } from "fs";
import Utils from "../utils/utils";

Utils.setTesting(false)
const input = Utils.readFile()

const VS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
]

const solvePart1 = (input: string) => {
    const lines = Utils.splitToLines(input);
    const fields = lines.map(line => line.split(""))
    const start = fields.map((line, x) => [x, line.findIndex(f => f === "^")]).filter(([x,y]) => y !== -1)[0]
    let curr = start;
    let vi = 0;
    while(true) {
        let v = VS[vi];
        fields[curr[0]][curr[1]] = "X"
        let nextPos = [curr[0] + v[0], curr[1] + v[1]]
        if(nextPos[0] < 0 || nextPos[0] >= fields.length || nextPos[1] < 0 || nextPos[1] >= fields[0].length)
            break;
        if(fields[nextPos[0]][nextPos[1]] == "#"){
            vi = (vi+1) % 4
        }else
            curr = nextPos;
    }
    return fields.map(line => line.filter(f => f === "X").length).reduce(Utils.adding)
}

const solvePart2 = (input: string) => {
    //trash
}


console.log(`Solution for Part 1:`, solvePart1(input))
console.log(`Solution for Part 2:`, solvePart2(input))