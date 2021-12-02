const fs = require("fs");
const path = require("path");
const puzzleInput = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8",
});

const rows = puzzleInput.split("\n").map((x) => parseInt(x));

//  Part 1
let part1 = 0;
for (let i = 1; i < rows.length; i++) {
  if (rows[i - 1] < rows[i]) {
    part1++;
  }
}

console.log("part 1: ", part1);

//  Part 2
let part2 = 0;
for (let i = 1; i < rows.length; i++) {
  const first = rows[i - 1] + rows[i] + rows[i + 1];
  const second = rows[i] + rows[i + 1] + rows[i + 2];

  if (second > first) {
    part2++;
  }
}

console.log("part 2: ", part2);
