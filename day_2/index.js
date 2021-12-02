const fs = require("fs");
const path = require("path");
const puzzleInput = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8",
});

const rows = puzzleInput.split("\n").map((x) => {
  const [direction, units] = x.split(" ");
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
  if (row.direction === "forward") {
    part2.horizontalPosition += row.units;

    const addedDepth = part2.aim * row.units;
    if (addedDepth > 0) {
      part2.depth += addedDepth;
    } else if (addedDepth < 0) {
      part2.depth -= addedDepth;
    }
  } else if (row.direction === "up") {
    part2.aim -= row.units;
  } else if (row.direction === "down") {
    part2.aim += row.units;
  }
}

console.log("part 2: ", part2.depth * part2.horizontalPosition);
