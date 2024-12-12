import ArrayUtils from "../utils/arrayUtils";
import FieldUtils, { Direction, DirectionsOffsets, Position } from "../utils/fieldUtils";
import FileUtils from "../utils/fileUtils";
import Utils from "../utils/utils";
import fs from "fs"

interface Region {
    title: string,
    area: number,
    perimeter: number,
    sides: number,
    locs: Position[]
}

const prep = (input: string) => {
    const lines = Utils.splitToLines(input)
    const field = lines.map(line => line.split(""))

    function getRegions(){
        const handledPositions = new Set<string>()
        let currentPosition: Position = {x: 0, y: 0}

        const regions: Region[] = [];

        function valid(pos: Position, region: string){
            return FieldUtils.validPosition(field, pos) && field[pos.x][pos.y] === region
        }

        function areaAndPerimeter(pos: Position, region: string, handled: Set<string>, regionSet: Set<string> = new Set()){
            let area = 1;
            let perimeter = 0;

            handled.add(FieldUtils.positionToString(pos))
            regionSet.add(FieldUtils.positionToString(pos))

            FieldUtils.getDirections().forEach(dir => {
                const nb = FieldUtils.add(pos, DirectionsOffsets[dir])
                let valid = FieldUtils.validPosition(field, nb);
                if(valid && field[nb.x][nb.y] === region){
                    if(!handled.has(FieldUtils.positionToString(nb))){
                        let score = areaAndPerimeter(nb, region, handled, regionSet)
                        area += score.area
                        perimeter += score.perimeter
                    }
                } else {
                    perimeter++;
                }
            })

            return {area, perimeter, handled: regionSet}
        }

        function getSides(pos: Position, region: string, handled: Set<string>){

            let all = Array.from(handled.values()).map(s => s.split("#").map(n => Number.parseInt(n))).map(([x,y]) => ({x, y}))
            let x = all.map(p => p.x).reduce((p, c) => Math.min(p, c))
            let y = all.filter(p => p.x == x).map(p => p.y).reduce((p, c) => Math.min(p, c))

            let curr = {x, y}

            const start = {x: curr.x, y: curr.y};
            let sides = 0;
            let dir = Direction.RIGHT;
            let went = false
            let justTurnedCount = 0

            function toLeft(){
                dir = Utils.mod(dir - 1, 4)
                justTurnedCount++;
                sides++;
                went = true;
            }

            function toRight(){
                dir = (dir + 1) % 4
                justTurnedCount++;
                sides++;
                went = true;
            }

            let locs: Position[] = []

            function step(){
                curr = FieldUtils.add(curr, DirectionsOffsets[dir])
                locs.push(curr)
                justTurnedCount = 0;
                went = true;
            }


            while(!(Utils.objectEquals(start, curr) && dir === Direction.RIGHT) || (!went)){
                const next = FieldUtils.add(curr, DirectionsOffsets[dir])
                const left = FieldUtils.add(curr, DirectionsOffsets[Utils.mod(dir - 1, 4)])
                const leftIsFree = !valid(left, region)
                const nextIsValid = valid(next, region)

                if(!leftIsFree){
                    if(justTurnedCount > 0){
                        step()
                    } else {
                        toLeft()
                    }
                }else{
                    if(nextIsValid){
                        step()
                    } else {
                        toRight()
                    }
                }
            }
            return {sides, locs}
        }


        for (let x = 0; x < field.length; x++) {
            for (let y = 0; y < field[x].length; y++) {
                const title = field[x][y]
                //if(x == 4 && y == 7)
                    if(!handledPositions.has(FieldUtils.positionToString({x,y}))){
                        const {area, perimeter, handled} = areaAndPerimeter({x,y}, title, handledPositions)
                        const {sides, locs} = getSides({x,y}, title, handled)
                        regions.push({
                            title,
                            area,
                            perimeter,     
                            sides,
                            locs            
                        })
                    }
            }
        }

        return regions
    }

    return {getRegions, field}
}

const solvePart1 = (input: string) => {
    const {getRegions} = prep(input)

    //return getRegions().map(r => r.area * r.perimeter).reduce(Utils.adding)
}
const solvePart2 = (input: string) => {
    const {getRegions, field} = prep(input)

    let nfield = []
    for(let i = 0; i < field.length; i++)
        nfield.push(Array(field[i].length).fill("."))
    getRegions().forEach((r, ri) => {
        r.locs.forEach(({x,y}, i) => {
            nfield[x][y] = r.title
        })
    })
    console.log(nfield.map(r => r.join("")).join("\n"))
    fs.writeFileSync("./out", nfield.map(r => r.join("")).join("\n"))
    
    //return getRegions().map(r => r.locs.forEach)
}

console.log(`Solution for Part 1:`, solvePart1(FileUtils.readFile(false)))
console.log(`Solution for Part 2:`, solvePart2(FileUtils.readFile(false)))