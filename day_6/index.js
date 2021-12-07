const fs = require("fs");
const path = require("path");

const puzzleInput = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8",
});

let rows = puzzleInput.split(",").map((row) => {
  return parseInt(row);
});

const createLanternfishPart1 = (data, days) => {
  for (let day = 0; day < days; day++) {
    let temp = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i] >= 1) {
        temp.push(data[i] - 1);
      } else {
        temp.push(6);
        temp.push(8);
      }
    }
    data = temp;
  }

  return data.length;
}

const createLanternfishPart2 = (data, days) => {
  let temp = [];

  for (let i = 0; i <= 8; i++) {
    temp.push(0);
  }

  for (let n of data) {
    temp[n] += 1;
  }

  for (let _ = 0; _ < days; _++) {
    let zeros = temp.splice(0, 1)[0];
    temp.push(0);

    temp[6] += zeros;
    temp[8] += zeros;
  }

  const sum = temp.reduce((acc, curr) => acc + curr, 0);

  return sum;
};

console.log("Part 1: ", createLanternfishPart1(rows, 80));
console.log("Part 2: ", createLanternfishPart2(rows, 256));