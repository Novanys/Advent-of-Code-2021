const fs = require("fs");
const path = require("path");
const range = require('lodash').range;

const puzzleInput = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8",
});

const rows = puzzleInput.split("\n").map((row) => {
  return row;
});

// Part 1
let part1 = 0;
let gammaRate = "";
let epsilonRate = "";

let temp = [];

for (let i = 0; i < 12; i++) {
  let zeroes = 0;
  let ones = 0;

  for (let x = 0; x < rows.length; x++) {
    if (rows[x][i] === "0") {
      zeroes++;
    }

    if (rows[x][i] === "1") {
      ones++;
    }
  }
  temp.push({ zeroes: zeroes, ones: ones });
}

for (const pos of temp) {
  if (pos.zeroes < pos.ones) {
    gammaRate += "1";
    epsilonRate += "0";
  } else {
    gammaRate += "0";
    epsilonRate += "1";
  }
}

part1 = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);

console.log("part 1: ", part1);

// Part 2
let part2 = 0;

//  range 12 för det var 12 siffror lång binary...
const oxy = range(12).reduce((accVal, currInd) => {
  let z = 0;
  let o = 0;

  for (let x = 0; x < accVal.length; x++) {
    if (accVal[x][currInd] === "0") {
      z++;
    }

    if (accVal[x][currInd] === "1") {
      o++;
    }
  }

  if (accVal.length > 1) {
    return accVal.filter((val) => {
      if (z > o) {
        return val[currInd] === '0';
      }
      if (o > z) {
        return val[currInd] === '1';
      }
      return val[currInd] === '1';
    })
  }
  return accVal;
}, rows);

//  range 12 för det var 12 siffror lång binary...
const scrub = range(12).reduce((accVal, currInd) => {
  let z = 0;
  let o = 0;

  for (let x = 0; x < accVal.length; x++) {
    if (accVal[x][currInd] === "0") {
      z++;
    }

    if (accVal[x][currInd] === "1") {
      o++;
    }
  }

  if (accVal.length > 1) {
    return accVal.filter((val) => {
      if (z > o) {
        return val[currInd] === '1';
      }
      if (o > z) {
        return val[currInd] === '0';
      }
      return val[currInd] === '0';
    })
  }
  return accVal;
}, rows);

part2 = parseInt(oxy, 2) * parseInt(scrub, 2);

console.log("part 2: ", part2);
