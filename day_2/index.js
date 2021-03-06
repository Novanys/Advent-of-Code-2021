const fs = require("fs");
const path = require("path");
const puzzleInput = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8",
});

const rows = puzzleInput.split("\n").map(row => {
  const [direction, units] = row.split(" ");
  return { direction: direction, units: parseInt(units) };
});


//  Part 1

const horizontalPosition = rows.reduce((acc, curr) => {
  if (curr.direction === "forward") {
    return acc + curr.units;
  }
  return acc;
}, 0);

const depth = rows.reduce((acc, curr) => {
  if (curr.direction === "up") {
    return acc - curr.units;
  }
  if (curr.direction === "down") {
    return acc + curr.units;
  }
  return acc;
}, 0);

console.log("part 1: ", horizontalPosition * depth);

//  Part 2

let part2 = {
  depth: 0,
  horizontalPosition: 0,
  aim: 0,
};

for (const row of rows) {
  switch (row.direction) {
    case 'forward':
      part2.horizontalPosition += row.units;
      part2.depth += part2.aim * row.units;
      break;
    case 'up':
      part2.aim -= row.units;
      break;
    case 'down':
      part2.aim += row.units;
      break;
  }
}

console.log("part 2: ", part2.depth * part2.horizontalPosition);
