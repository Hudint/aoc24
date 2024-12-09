import ArrayUtils from "../utils/arrayUtils";
import FileUtils from "../utils/fileUtils";
import Utils from "../utils/utils";

const prep = (input: string) => {
    const nums = input.split("")
    .map(n => Number.parseInt(n))
    return {nums}
}

const solvePart1 = (input: string) => {
    const {nums} = prep(input)
    let str = "";
    let currId = 0;
    let curr = 0;
    let row = []

    nums.forEach((n, i) => {
        if(i % 2 === 1) 
            curr += n
        else 
            addToRow(n)
    })

    function addToRow(n){
        for (let i = 0; i < n; i++) {
            row[i + curr] = currId
        }
        currId++;
        curr+=n;
    }
    let emptI = 0;
    let valI = row.length-1;

    while((emptI = ArrayUtils.findIndexFrom(row, v => v === undefined, emptI)) != -1 
    && (valI = ArrayUtils.findIndexFrom(row, v => v !== undefined, valI, -1)) != -1
    && emptI < valI){
        row[emptI] = row[valI]
        row[valI] = undefined;
        emptI++;
        valI--;
    }

    return row.filter(v => v !== undefined).map((v,i) => v * i).reduce(Utils.adding)
}

type Block = {
    id: number,
    length: number
}
const solvePart2 = (input: string) => {
    const {nums} = prep(input)
    let blocks: Block[] = nums.map((n, i) => ({
        id: (i%2 === 0) ? i/2 : -1,
        length: n   
    }))

    const processed = []
    let valI = blocks.length - 1;
    while((valI = ArrayUtils.findIndexFrom(blocks,b => b.id !== -1 && !processed.includes(b.id), valI, -1))){
        const block = blocks[valI];
        processed.push(block.id)
        let emptI = blocks.findIndex(b => b.id === -1 && b.length >= block.length)
        if(emptI !== -1 && valI > emptI){
            const emtp = blocks[emptI];
            blocks[emptI] = block;
            blocks[valI] = {
                id: -1,
                length: block.length
            }
            blocks.splice(emptI + 1, 0, {
                id: -1,
                length: emtp.length - block.length
            })
        }
    }

    return blocks.filter(b => b.length > 0).flatMap(b => Array(b.length).fill(b.id === -1 ? 0 : b.id)).map((v,i) => v * i).reduce(Utils.adding)
}

console.log(`Solution for Part 1:`, solvePart1(FileUtils.readFile(false)))
console.log(`Solution for Part 2:`, solvePart2(FileUtils.readFile(false)))