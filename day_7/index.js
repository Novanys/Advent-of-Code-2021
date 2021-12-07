const fs = require("fs");
const { range } = require("lodash");
const path = require("path");

const puzzleInput = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8",
});

let rows = puzzleInput.split(",").map((row) => {
  return parseInt(row);
});

const calcCrabSubmarinesPart1 = (data) => {
  let cost = [];
  for (let i = 0; i < data.length; i++) {
    let temp = [];
    for (let j = 0; j < data.length; j++) {
      let diff = data[i] - data[j];
      if (diff < 0) {
        diff = diff * -1;
      }

      temp.push(diff);
    }
    cost.push(temp);
  }

  const sumArr = cost.map((c) => {
    return c.reduce((acc, curr) => acc + curr, 0);
  });

  const sum = sumArr.reduce((acc, curr) => {
    if (acc > curr) return curr;
    return acc;
  }, sumArr[0]);

  return sum;
};

const calcCrabSubmarinesPart2 = (data) => {
  let cost = [];

  const lowest = data.reduce((acc, curr) => {
    if (acc > curr) return curr;
    return acc;
  }, data[0]);

  const highest = data.reduce((acc, curr) => {
    if (acc > curr) return acc;
    return curr;
  }, data[0]);

  for (let x = 0; x < data.length; x++) {
    let temp = [];
    for (let val of range(lowest, highest + 1)) {
      let diff = data[x] - val;
      if (diff < 0) {
        diff = diff * -1;
      }

      let totalCost = 0;
      for (let i = 1; i <= diff; i++) {
        totalCost += i;
      }

      temp.push(totalCost);
    }
    cost.push(temp);
  }

  let newSum = [];
  for (let val in range(lowest, highest + 1)) {
    let tempSum = 0;
    for (let i = 0; i < data.length; i++) {
      tempSum += cost[i][val];
    }
    newSum.push(tempSum);
  }

  const sum = newSum.reduce((acc, curr) => {
    if (acc > curr) return curr;
    return acc;
  }, newSum[0]);

  return sum;
};

console.log("Part 1: ", calcCrabSubmarinesPart1(rows));
console.log("Part 2: ", calcCrabSubmarinesPart2(rows));
