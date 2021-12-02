const fs = require("fs");
const path = require("path");
const puzzleInput = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8",
});

const rows = puzzleInput.split("\n").map(row => {
  const [direction, units] = row.split(" ");
  return { direction: direction, units: parseInt(units) };
});

// Part 1
let part1 = 0;

for (const row of rows) {

}

console.log('part1: ', part1);

// Part 2
let part2 = 0;

for (const row of rows) {

}

console.log('part2: ', part2);
