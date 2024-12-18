//gameLogic.js
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
    num1 = Math.random() * 16;
    num2 = Math.random() * 16;
  }
  grid[num1 / 4][num1 % 4] = 2;
  grid[num2 / 4][num2 % 4] = 2;
  return grid;
};

export const moveTiles = (grid, direction) => {
  return grid;
};

export const mergeTiles = (grid) => {
  return grid;
};
