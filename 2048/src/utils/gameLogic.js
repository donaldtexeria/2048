//gameLogic.js
const generateRandomTile = () => {
  const val = Math.random();
  if (val < 0.9) {
    return 2;
  }
  return 4;
};
export const initializeGrid = () => {
  var grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  var num1 = 0;
  var num2 = 0;
  while (num1 == num2) {
    num1 = Math.trunc(Math.random() * 16);
    num2 = Math.trunc(Math.random() * 16);
  }
  grid[Math.floor(num1 / 4)][num1 % 4] = generateRandomTile();
  grid[Math.floor(num2 / 4)][num2 % 4] = generateRandomTile();
  return grid;
};

const transpose = (grid) =>
  grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
const reverseRows = (grid) => grid.map((row) => row.reverse());

const areGridsEqual = (grid1, grid2) => {
  for (let i = 0; i < grid1.length; i++) {
    for (let j = 0; j < grid1[i].length; j++) {
      if (grid1[i][j] !== grid2[i][j]) {
        return false;
      }
    }
  }
  return true;
};

export const moveTiles = (grid, direction, score) => {
  let s = score;
  let newGrid = [...grid.map((row) => [...row])]; // Deep copy
  let changed = false;
  switch (direction) {
    case "left":
      newGrid = newGrid.map((row) => {
        const fRow = row.filter((val) => val !== 0);
        for (let i = 0; i < fRow.length; i++) {
          if (fRow[i] == 0) {
            continue;
          }
          if (fRow[i] == fRow[i + 1]) {
            fRow[i] *= 2;
            s += fRow[i];
            fRow[i + 1] = 0;
          }
        }
        const filteredRow = fRow.filter((val) => val !== 0);
        while (filteredRow.length < 4) filteredRow.push(0);
        if (filteredRow == row) changed = true;
        return filteredRow;
      });
      break;

    case "right":
      newGrid = newGrid.map((row) => {
        const fRow = row.filter((val) => val !== 0);
        for (let i = fRow.length - 1; i >= 0; i--) {
          if (fRow[i] == 0) {
            continue;
          }
          if (fRow[i] == fRow[i - 1]) {
            fRow[i] *= 2;
            s += fRow[i];
            fRow[i - 1] = 0;
          }
        }
        const filteredRow = fRow.filter((val) => val !== 0);
        while (filteredRow.length < 4) filteredRow.unshift(0); // Add zeros to the start
        return filteredRow;
      });
      break;

    case "up":
      newGrid = transpose(newGrid);
      newGrid = newGrid.map((row) => {
        const fRow = row.filter((val) => val !== 0);
        for (let i = 0; i < fRow.length; i++) {
          if (fRow[i] == 0) {
            continue;
          }
          if (fRow[i] == fRow[i + 1]) {
            fRow[i] *= 2;
            s += fRow[i];
            fRow[i + 1] = 0;
          }
        }
        const filteredRow = fRow.filter((val) => val !== 0);
        while (filteredRow.length < 4) filteredRow.push(0);
        return filteredRow;
      });
      newGrid = transpose(newGrid);
      break;

    case "down":
      newGrid = transpose(newGrid);
      newGrid = newGrid.map((row) => {
        const fRow = row.filter((val) => val !== 0);
        for (let i = fRow.length - 1; i >= 0; i--) {
          if (fRow[i] == 0) {
            continue;
          }
          if (fRow[i] == fRow[i - 1]) {
            fRow[i] *= 2;
            s += fRow[i];
            fRow[i - 1] = 0;
          }
        }
        const filteredRow = fRow.filter((val) => val !== 0);
        while (filteredRow.length < 4) filteredRow.unshift(0); // Add zeros to the start
        return filteredRow;
      });
      newGrid = transpose(newGrid);
      break;

    default:
      break;
  }
  if (areGridsEqual(newGrid, grid)) {
    return { newGrid, s };
  }
  while (true) {
    let ind = Math.trunc(Math.random() * 16);
    if (newGrid[Math.floor(ind / 4)][ind % 4] == 0) {
      newGrid[Math.floor(ind / 4)][ind % 4] = generateRandomTile();
      break;
    }
  }

  return { newGrid, s };
};

export const mergeTiles = (grid) => {
  return grid;
};
