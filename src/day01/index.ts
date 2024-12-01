import Utils from "../utils/utils";

Utils.setTesting(false)
const input = Utils.readFile()

const solvePart1 = (input: string) => {
    const lines = Utils.splitToLines(input);
    let ll = []
    let lr = []
    lines.map(line => /^([0-9]+)\s*([0-9]+)$/.exec(line)).forEach(([all, first, second]) => {
        ll.push(Number.parseInt(first));
        lr.push(Number.parseInt(second))
    })
    ll.sort()
    lr.sort()
    let diff_sum = 0;
    for (let i = 0; i < ll.length; i++) {
        diff_sum += Math.abs(ll[i] - lr[i])
    }
    return diff_sum
}

const solvePart2 = (input: string) => {
    const lines = Utils.splitToLines(input);
    let ll = []
    let lr = []
    lines.map(line => /^([0-9]+)\s*([0-9]+)$/.exec(line)).forEach(([all, first, second]) => {
        ll.push(Number.parseInt(first));
        lr.push(Number.parseInt(second))
    })
    return ll.map(n => n * lr.filter(r => r == n).length).reduce((p,c) => p+c, 0)
}

console.log(`Solution for Part 1:`, solvePart1(input))
console.log(`Solution for Part 2:`, solvePart2(input))