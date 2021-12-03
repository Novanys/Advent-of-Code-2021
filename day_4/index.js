const fs = require("fs");
const path = require("path");
const range = require('lodash').range;

const puzzleInput = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8",
});

const rows = puzzleInput.split("\n").map((row) => {
  return row;
});


//  Part 1
let part1 = 0;

for (const row of rows) {

}

console.log("part 1: ", part1);

// Part 2
let part2 = 0;

for (const row of rows) {

}

console.log("part 2: ", part2);
