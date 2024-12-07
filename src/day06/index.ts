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
    const lines = Utils.splitToLines(input);
    const fields = lines.map(line => line.split(""))
    const copy = lines.map(line => line.split(""))

    let curr = fields.map((line, x) => [x, line.findIndex(f => f === "^")]).filter(([x,y]) => y !== -1)[0]
    
    let turn = []
    let extra = []
    let vi = 0;
    
    while(true) {
        let v = VS[vi];
        fields[curr[0]][curr[1]] = "X"
        let nextPos = Utils.addOpArray(curr, v)
        if(nextPos[0] < 0 || nextPos[0] >= fields.length || nextPos[1] < 0 || nextPos[1] >= fields[0].length)
            break;

        let i = 0;
        let sidePos = curr;
        while(true){
            let oldSidePos = sidePos;
            sidePos = Utils.addOpArray(curr, Utils.multiplyOpArray(VS[(vi+1) % 4], i));
            if(!Utils.validPosition(fields, sidePos as [number, number]))
                break;  
            if(i > 1 && fields[oldSidePos[0]][oldSidePos[1]] == "X" && fields[sidePos[0]][sidePos[1]] == "#"){
                extra.push(nextPos)
                break;
            }
            i++;
        }
        if(fields[nextPos[0]][nextPos[1]] == "#"){
            vi = (vi+1) % 4
            turn.push(curr)
        }else
            curr = nextPos;
    }
    extra.forEach(pos => copy[pos[0]][pos[1]] = "O")

    console.log("\n" + copy.map(l => l.join("")).join("\n"))
    return copy.map(row => row.filter(f => f == "O").length).reduce(Utils.adding)
}


console.log(`Solution for Part 1:`, solvePart1(input))
console.log(`Solution for Part 2:`, solvePart2(input))