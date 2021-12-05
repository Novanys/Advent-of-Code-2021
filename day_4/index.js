const fs = require("fs");
const path = require("path");
const flatMap = require("lodash").flatMap;

const puzzleInput = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8",
});

const rows = puzzleInput.split("\n").map((row) => {
  return row.replace("\r", "");
});

const squidNumbers = rows[0].split(",").map((num) => parseInt(num));

const createBoards = (rows) => {
  const boards = [];

  let tempBoard = [];
  for (let i = 1; i < rows.length; i++) {
    if (rows[i] === "") {
      if (tempBoard.length > 0) {
        boards.push(tempBoard);
        tempBoard = [];
      }
    } else {
      const colNums = rows[i]
        .split(" ")
        .map((num) => parseInt(num))
        .filter((num) => !isNaN(num));

      tempBoard.push(colNums);
    }
  }

  return boards;
};

const checkWin = (boards, drawnNumber) => {
  const tempWinners = [];

  for (let b = 0; b < boards.length; b++) {
    let board = boards[b];
    let currentBoardPushed = false;

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (board[r][c] === drawnNumber) {
          board[r][c] = true;
        }

        if (c === 4) {
          if (board[r].every((x) => x === true)) {
            tempWinners.push(board);
            currentBoardPushed = true;
          }
        }

        if (r === 4) {
          let winByRow = true;
          for (let iR = 0; iR < 5; iR++) {
            if (board[iR][c] !== true) {
              winByRow = false;
            }
          }
          if (winByRow === true && currentBoardPushed === false) {
            tempWinners.push(board);
          }
        }
      }
    }
  }

  tempWinners.forEach((win) => {
    const i = boards.findIndex((x) => {
      return x === win;
    });
    boards.splice(i, 1);
  });

  return tempWinners;
};

const draw = (boards) => {
  const drawNums = 5;
  let round = 0;
  let winners = [];

  for (let i = 0; i < squidNumbers.length; i += drawNums + round - 1) {
    for (let r = i; r < drawNums + round + i; r++) {
      if (squidNumbers[r]) {
        let winningBoards = checkWin(boards, squidNumbers[r]);

        if (winningBoards.length > 0) {
          winners.push(
            ...winningBoards.map((board) => ({
              board: board,
              squidNumber: squidNumbers[r],
            }))
          );
        }
      }
    }
    round++;
  }

  return winners;
};

const getResult = (winner) => {
  const remainingNums = flatMap(winner.board).filter((num) => num !== true);
  const countedRemainingNums = remainingNums.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return countedRemainingNums * winner.squidNumber;
};

const createdBoards = createBoards(rows);

const winners = draw(createdBoards);

//  Part 1
let part1 = getResult(winners[0]);
console.log("part 1: ", part1);

// Part 2
let part2 = getResult(winners[winners.length - 1]);
console.log("part 2: ", part2);
