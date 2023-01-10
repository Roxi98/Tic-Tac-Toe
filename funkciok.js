function randomIntBetweenTwoNumbers(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * A getTable funkció egy táblát hoz létre egy szám és string lista segítségével.
 * {squares} - a lista amely meghatarozza a szamok poziciojat
 * return - egy nagy tabla kitoltve
 */

function getTable(squares) {
  return `
      |-----------|
      | ${squares[0]} | ${squares[1]} | ${squares[2]} |
      |-----------|
      | ${squares[3]} | ${squares[4]} | ${squares[5]} |
      |-----------|
      | ${squares[6]} | ${squares[7]} | ${squares[8]} |
      |-----------|
      `;
}

module.exports = {
  randomIntBetweenTwoNumbers,
  getTable,
};
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
for (let i = 0; i < lines.length; i++) {
  const [a, b, c] = lines[i];
  console.log([a, b, c]);
}
