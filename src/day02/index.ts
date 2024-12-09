import Utils from "../utils/utils";

Utils.getFileUtils().setTesting(false)
const input = Utils.getFileUtils().readFile()

const solvePart1 = (input: string) => {
    const lines = Utils.splitToLines(input);
    const numLines = lines.map(line => line.split(' ').map(n => Number.parseInt(n)))
    const safeLines = numLines.map(line => {
        let safe = true;
        let inc = undefined;
        for (let i = 0; i < line.length - 1 && safe; i++) {
            if(inc === undefined)
                inc = line[i] < line[i + 1]
            else
                safe = safe && ((line[i] < line[i + 1]) == inc)
            let diff = Math.abs(line[i] - line[i + 1]);
            safe = safe && (diff >= 1 && diff <= 3)
        }
        return safe
    })
    return safeLines.filter(v => v).length
}

const solvePart2 = (input: string) => {
    const lines = Utils.splitToLines(input);
    const numLines = lines.map(line => line.split(' ').map(n => Number.parseInt(n)))

    function getLineErrors(line: number[]){
        let errNbs = new Set<number>();
        let ll = line.length
        let inc = line.filter((v, i) => (i+1 < ll && v < line[i+1])).length > 2

        for (let i = 0; i < line.length - 1; i++) {
            let diff = Math.abs(line[i] - line[i + 1]);
            if(!((line[i] < line[i + 1]) == inc && diff >= 1 && diff <= 3)){
                errNbs.add(i)
                errNbs.add(i+1)
            }
        }
        return errNbs;
    }

    const safeLines = numLines.map(line => {
        let lerr = getLineErrors(line);
        let rems = Array.from(lerr.values()).map(i => getLineErrors(Utils.getArrayUtils().removeIndecesFromArray(line, [i])).size === 0).some(v => v)
        return lerr.size == 0 || rems
    })
    return safeLines.filter(v => v).length
}

console.log(`Solution for Part 1:`, solvePart1(input))
console.log(`Solution for Part 2:`, solvePart2(input))