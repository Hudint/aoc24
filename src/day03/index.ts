import Utils from "../utils/utils";

Utils.setTesting(false)
const input = Utils.readFile()

const solvePart1 = (input: string) => {
    const lines = Utils.splitToLines(input);
    return lines.map(line => Utils.matches(line, /mul\(([0-9]+),([0-9]+)\)/g).map(([a,f,s]) =>Number.parseInt(f) * Number.parseInt(s))).flatMap(r => r).reduce(Utils.adding, 0)
}

const solvePart2 = (input: string) => {
    const lines = Utils.splitToLines(input);
    let status = true
    return lines.map(line => Utils.matches(line, /mul\(([0-9]+),([0-9]+)\)|do\(\)|don't\(\)/g))
    .map(insts => {
        return insts.map(inst => {
            let res = undefined;
            if(inst[0].startsWith("don't"))
                status = false
            else if(inst[0].startsWith("do"))
                status = true
            else if(status)
                res = Number.parseInt(inst[1]) * Number.parseInt(inst[2])
            return res
        }).filter(v => v).reduce(Utils.adding, 0)
    }).reduce(Utils.adding, 0)
}

console.log(`Solution for Part 1:`, solvePart1(input))
console.log(`Solution for Part 2:`, solvePart2(input))