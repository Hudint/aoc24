import ArrayUtils from "../utils/arrayUtils";
import FieldUtils, { Direction, DirectionsOffsets, Position } from "../utils/fieldUtils";
import FileUtils from "../utils/fileUtils";
import Utils from "../utils/utils";


const prep = (input: string) => {
    const lines = Utils.splitToLines(input)
    const field = FieldUtils.linesToNumberField(lines)

    function scoreTrailHead(start: Position, distinct: boolean){
        if(field[start.x][start.y] !== 0)
            return 0;

        let done: Position[] = [];
        let curr: Position[] = [start]
        let count = 0;

        while(curr.length !== 0) {
            done.push(...curr)
            done = ArrayUtils.onlyUnique(done)

            curr = curr.flatMap(pos => FieldUtils.getDirections()
            .map(d => FieldUtils.add(pos, DirectionsOffsets[d]))
            .filter(np => FieldUtils.validPosition(field, np) && field[np.x][np.y] === (field[pos.x][pos.y] + 1) && Array.from(done).findIndex(p => Utils.objectEquals(np, p)) === -1))
            if(!distinct)
                curr = ArrayUtils.onlyUnique(curr)
            count += curr.filter(c => field[c.x][c.y] === 9).length
        }
        return count
    }

    return {field, scoreTrailHead}
}



const solvePart1 = (input: string) => {
    const {field, scoreTrailHead} = prep(input)
    return field.map((r,x) => r.map((c,y) => scoreTrailHead({x,y}, false))).map(r => r.reduce(Utils.adding)).reduce(Utils.adding)
}

const solvePart2 = (input: string) => {
    const {field,scoreTrailHead} = prep(input)
    return field.map((r,x) => r.map((c,y) => scoreTrailHead({x,y}, true))).map(r => r.reduce(Utils.adding)).reduce(Utils.adding)

}

console.log(`Solution for Part 1:`, solvePart1(FileUtils.readFile(false)))
console.log(`Solution for Part 2:`, solvePart2(FileUtils.readFile(false)))