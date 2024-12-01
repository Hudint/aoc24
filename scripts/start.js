const { spawn } = require("child_process")
const { readdirSync} = require("fs")
const { cp } = require("shelljs")

const day = process.argv.length > 2 ? Number.parseInt(process.argv[2]) : new Date().getDate()
const year = process.argv.length > 3 ? Number.parseInt(process.argv[3]) : new Date().getFullYear()
const days = readdirSync("./src")
const folderName = `day${pad(day, 2)}`
const newDay = `src/${folderName}`

if (!days.includes(folderName)) {
    console.log(`Creating file structure for day ${day}...`)
    cp("-r", "src/template", newDay)
    // fetch(`https://adventofcode.com/${year}/day/${day}`,)
    //     .then(r => r.text())
    //     .then(txt => writeFileSync(path.join(newDay, "input.txt"), txt, {encoding: "utf8"}))
}

console.clear()
console.log(`You can get the Puzzle here: https://adventofcode.com/${year}/day/${day}`)
console.log(`You can get the input here: https://adventofcode.com/${year}/day/${day}/input`)

spawn(/^win/.test(process.platform) ? 'nodemon.cmd' : "nodemon", ["-x", "ts-node", `src/${folderName}/index.ts`], {
    stdio: "inherit",
})

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}