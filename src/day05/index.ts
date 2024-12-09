import Utils from "../utils/utils";

Utils.getFileUtils().setTesting(false)
const input = Utils.getFileUtils().readFile()

const solvePart1 = (input: string) => {
    const lines = Utils.splitToLines(input);
    let rules = {};
    lines.map(line => /^([0-9]+)\|([0-9]+)$/.exec(line)).filter(v => v != null).forEach(([a,n1,n2]) => {
        let p1 = Number.parseInt(n1)
        let p2 = Number.parseInt(n2)
        rules[p1] = rules[p1] ?? []
        rules[p1].push(p2)
    })

    const lists = lines.filter(line => line.includes(",")).map(line => line.split(",")).map(line => line.map(n => Number.parseInt(n))).filter(line => {
        let sorted = true;
        for (let i = 1; i < line.length && sorted; i++) {
            let biggerNum = line[i]
            let smaler = rules[line[i]]
            
            if(!smaler)
                continue;

            for (let j = 0; j < i && sorted; j++) {
                if(smaler.includes(line[j]))
                    sorted = false
            }
        }
        return sorted
    })

    return lists.map(list => Utils.getArrayUtils().getMiddleItem(list)).reduce(Utils.adding, 0)
}

const solvePart2 = (input: string) => {
    const lines = Utils.splitToLines(input);
    let rules = {};
    lines.map(line => /^([0-9]+)\|([0-9]+)$/.exec(line)).filter(v => v != null).forEach(([a,n1,n2]) => {
        let p1 = Number.parseInt(n1)
        let p2 = Number.parseInt(n2)
        rules[p1] = rules[p1] ?? []
        rules[p1].push(p2)
    })

    const lists = lines.filter(line => line.includes(",")).map(line => line.split(",")).map(line => line.map(n => Number.parseInt(n))).filter(line => {
        let sorted = true;
        for (let i = 1; i < line.length && sorted; i++) {
            let biggerNum = line[i]
            let smaler = rules[line[i]]
            
            if(!smaler)
                continue;

            for (let j = 0; j < i && sorted; j++) {
                if(smaler.includes(line[j]))
                    sorted = false
            }
        }
        return !sorted
    }).map(line =>([...line]).sort((b,a) => (rules[a]?.includes(b) ? 1 : (rules[b]?.includes(a) ? -1 : 0))))

    return lists.map(list => Utils.getArrayUtils().getMiddleItem(list)).reduce(Utils.adding, 0)
}

console.log(`Solution for Part 1:`, solvePart1(input))
console.log(`Solution for Part 2:`, solvePart2(input))