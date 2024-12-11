import FileUtils from "../utils/fileUtils";
import Utils from "../utils/utils";

function splitStone(stone: string){
    const n = Number.parseInt(stone)
    if(n === 0)
        return ["1"]
    else if(stone.length % 2 == 0){
        let m = stone.length / 2
        return [String(Number.parseInt(stone.slice(0, m))), String(Number.parseInt(stone.slice(m)))]
    } else 
        return ["" + (n*2024)]
}

const prep = (input: string) => {
    const lines = Utils.splitToLines(input)
    const stones = lines[0].split(" ")


    function calc(n: number){
        const cache = new Map<string, number>()
        function c(stone: string, steps: number){
            if(cache.has(stone))
                return cache.get(stone)
            let result = 0;

            if(steps === 0)
                result = 1
            else result = splitStone(stone).map(s => c(s, steps - 1)).reduce(Utils.adding)
            cache.set(stone, result)
            return result
        }

        return stones.map(stone => c(stone, n)).reduce(Utils.adding)
    }
    return {calc}
}

const solvePart1 = (input: string) => {
    const {calc} = prep(input)
    return calc(25)
}

const solvePart2 = (input: string) => {
    const {calc} = prep(input)
    return calc(75)
}

console.log(`Solution for Part 1:`, solvePart1(FileUtils.readFile(false)))
console.log(`Solution for Part 2:`, solvePart2(FileUtils.readFile(false)))