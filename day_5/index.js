const fs = require("fs");
const flatMap = require("lodash").flatMap;
const path = require("path");
const puzzleInput = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8",
}).trim();

const rows = puzzleInput.split("\n").map(row => {
  const [start, end] = row.split(' -> ');

  const [startX, startY] = start.split(',').map(x => parseInt(x));
  const [endX, endY] = end.split(',').map(x => parseInt(x));

  return {
    start: {
      x: startX,
      y: startY,
    },
    end: {
      x: endX,
      y: endY,
    }
  }
});

const highestX = Math.max(...rows.map(row => row.start.x), ...rows.map(row => row.end.x));
const highestY = Math.max(...rows.map(row => row.start.y), ...rows.map(row => row.end.y));

const createGrid = (max) => {
  const tempGrid = [];
  for (let y = 0; y <= max; y++) {
    let tempXAxis = [];
    for (let x = 0; x <= max; x++) {
      tempXAxis.push(0);
    }
    tempGrid.push(tempXAxis);
  }

  return tempGrid;
}

const countOverlaps = grid => flatMap(grid).reduce((acc, curr) => {
  if (curr > 1) {
    return acc + 1;
  }
  return acc;
}, 0);

//  Part 1
const part1Grid = createGrid(Math.max(highestX, highestY));

rows.forEach(row => {
  const minY = Math.min(row.start.y, row.end.y);
  const maxY = Math.max(row.start.y, row.end.y);

  const minX = Math.min(row.start.x, row.end.x);
  const maxX = Math.max(row.start.x, row.end.x);

  const isVertical = row.start.x === row.end.x;
  const isHorizontal = row.start.y === row.end.y;

  if (isVertical || isHorizontal) {
    for (let y = minY - 1; y < maxY; y++) {
      for (let x = minX - 1; x < maxX; x++) {
        part1Grid[y][x]++;
      }
    }
  }
})

console.log('Part 1: ', countOverlaps(part1Grid));

fs.writeFileSync(path.join(__dirname, 'output_part_1_grid.txt'), part1Grid.map(x => {
  return x.map(y => {
    if (y === 0) {
      return ' . ';
    }
    return ' ' + y + ' ';
  }).join('');
}).join(`\n`).toString());

//  Part 2
const part2Grid = createGrid(Math.max(highestX, highestY));

rows.forEach(row => {
  const minY = Math.min(row.start.y, row.end.y);
  const maxY = Math.max(row.start.y, row.end.y);

  const minX = Math.min(row.start.x, row.end.x);
  const maxX = Math.max(row.start.x, row.end.x);

  const isVertical = row.start.x === row.end.x;
  const isHorizontal = row.start.y === row.end.y;

  let isDiagonal = maxY - minY === maxX - minX;

  if (isVertical || isHorizontal) {
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        part2Grid[y][x]++;
      }
    }
  }

  if (isDiagonal) {
    for (let i = 0; i <= maxX - minX; i++) {
      const yIndex = row.start.y > row.end.y ? row.start.y - i : row.start.y + i;
      const xIndex = row.start.x > row.end.x ? row.start.x - i : row.start.x + i;

      part2Grid[yIndex][xIndex]++;
    }
  }
})

console.log('Part 2: ', countOverlaps(part2Grid))

fs.writeFileSync(path.join(__dirname, 'output_part_2_grid.txt'), part2Grid.map(x => {
  return x.map(y => {
    if (y === 0) {
      return ' . ';
    }
    return ' ' + y + ' ';
  }).join('');
}).join(`\n`).toString());