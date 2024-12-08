import Utils from "../utils/utils";



const prep = (input: string) => {
    const lines = Utils.splitToLines(input)
    return {lines}
}

const solvePart1 = (input: string) => {
    const {lines} = prep(input)
}

const solvePart2 = (input: string) => {
    const {lines} = prep(input)
}

console.log(`Solution for Part 1:`, solvePart1(Utils.readFile(true)))
console.log(`Solution for Part 2:`, solvePart2(Utils.readFile(true)))