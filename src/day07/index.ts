import Utils from "../utils/utils";

Utils.getFileUtils().setTesting(false)
const input = Utils.getFileUtils().readFile()

type OP = (n1: number, n2: number) => number

function getAllCombinations(count: number, allOps: OP[]){
    if(count <= 0)
        return [];

    const result: OP[][] = [];

    function addOp(ops: OP[]){
        if(ops.length === count) 
            result.push(ops)
        else {
            allOps.forEach(op => addOp([...ops, op]))
        }
    }

    addOp([])
    return result;
}


function canAchieveResult(numbers: number[], allOps: OP[]): boolean {
    const [target, ...nums] = numbers
    const combs = getAllCombinations(nums.length - 1, allOps);
    return combs.some(c => {
        let curr = nums[0]
        for (let i = 0; i < (nums.length - 1); i++){
            curr = c[i](curr, nums[i + 1])
        }
        return target === curr
    })
}

const solvePart1 = (input: string) => {
    const lines = Utils.splitToLines(input);

    return lines.map(line => line.replace(":", "").split(" "))
    .map(nums => nums.map(n => Number.parseInt(n)))
    .filter(nums => canAchieveResult(nums, [(n1, n2) => n1 + n2, (n1,n2) => n1 * n2]))
    .map(nums => nums[0])
    .reduce(Utils.adding, 0)
}

const solvePart2 = (input: string) => {
    const lines = Utils.splitToLines(input);

    return lines.map(line => line.replace(":", "").split(" "))
    .map(nums => nums.map(n => Number.parseInt(n)))
    .filter(nums => canAchieveResult(nums, [(n1, n2) => n1 + n2, (n1,n2) => n1 * n2, (n1, n2) => Number.parseInt((""+n1)+n2)]))
    .map(nums => nums[0])
    .reduce(Utils.adding, 0)

}

console.log(`Solution for Part 1:`, solvePart1(input))
console.log(`Solution for Part 2:`, solvePart2(input))