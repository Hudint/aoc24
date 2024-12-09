import Utils from "../utils/utils";

Utils.getFileUtils().setTesting(false)
const input = Utils.getFileUtils().readFile()

const XMAS = "XMAS"
function searchForXmas(matrix: string[][], x: number, y:number){
    let count = 0;
    for (let velx = -1; velx <= 1; velx++) {
        for (let vely = -1; vely <= 1; vely++) {
            let foundLen = 0;
            for (let i = 0; i < XMAS.length; i++) {
                let offsetx = i*velx+x;
                let offsety = i*vely+y;
                if(Math.min(offsetx, offsety) >= 0 
                        && offsetx < matrix.length 
                        && offsety < matrix[offsetx].length 
                        && matrix[offsetx][offsety] === XMAS[foundLen])
                    foundLen++;
                else {
                    break;
                }
            }
            if(foundLen === XMAS.length) 
                count++;
        }
    }
    return count
}

const solvePart1 = (input: string) => {
    const lines = Utils.splitToLines(input);
    const chars = lines.map(line => line.replace(/[^XMAS]/g, ".").split(''));
    
    let count = 0;
    for (let x = 0; x < chars.length; x++) {
        for (let y = 0; y < chars[x].length; y++) {
            count += searchForXmas(chars, x, y)
        }
    }
    return count
}

const MS_AR = [{i: 1, c: "M"}, {i: -1, c: "S"}];
const OFF_AR = [1,-1];
function searchForMasAsX(matrix: string[][], x: number, y: number){
    if(!(matrix[x][y] === "A"))
        return  0;

    let count = 0;
    OFF_AR.forEach(offx => {
        OFF_AR.forEach(offy => {
            let found = true;
            MS_AR.forEach(({i, c}) => {
                let offsetx = i*offx+x;
                let offsety = i*offy+y;
                if(!(Math.min(offsetx, offsety) >= 0 
                        && offsetx < matrix.length 
                        && offsety < matrix[offsetx].length 
                        && matrix[offsetx][offsety] === c)){
                    found = false;
                    return;
                }
            })
            count += (found ? 1 : 0)
        })
    })
    return count === 2 ? 1 : 0
}

const solvePart2 = (input: string) => {
    const lines = Utils.splitToLines(input);
    const chars = lines.map(line => line.replace(/[^XMAS]/g, ".").split(''));
    let count = 0;
    for (let x = 0; x < chars.length; x++) {
        for (let y = 0; y < chars[x].length; y++) {
            count += searchForMasAsX(chars, x, y)
        }
    }
    return count
}

console.log(`Solution for Part 1:`, solvePart1(input))
console.log(`Solution for Part 2:`, solvePart2(input))