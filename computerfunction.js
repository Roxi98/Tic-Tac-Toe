const { randomIntBetweenTwoNumbers, getTable } = require("./funkciok");
let emptySquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const winCondition = [
  [emptySquares[0], emptySquares[1], emptySquares[2]],
  [emptySquares[3], emptySquares[4], emptySquares[5]],
  [emptySquares[6], emptySquares[7], emptySquares[8]],
  [emptySquares[0], emptySquares[3], emptySquares[6]],
  [emptySquares[1], emptySquares[4], emptySquares[7]],
  [emptySquares[2], emptySquares[5], emptySquares[8]],
  [emptySquares[0], emptySquares[4], emptySquares[8]],
  [emptySquares[2], emptySquares[4], emptySquares[6]],
];
function computerTurnh() {
  let computerAnswer = 0;
  let done = false;
  do {
    if (emptySquares[4] !== "0" && emptySquares[4] !== "X") {
      emptySquares[4] = "0";
    } else if ([emptySquares[0] === "X" && emptySquares[1] === "X"]) {
      emptySquares[2] === "0";
    } else if ([emptySquares[1] === "X" && emptySquares[2] === "X"]) {
      emptySquares[0] === "0";
    } else if ([emptySquares[0] === "X" && emptySquares[2] === "X"]) {
      emptySquares[1] === "0";
    } else if ([emptySquares[3] === "X" && emptySquares[4] === "X"]) {
      emptySquares[5] === "0";
    } else if ([emptySquares[4] === "X" && emptySquares[5] === "X"]) {
      emptySquares[3] === "0";
    } else if ([emptySquares[3] === "X" && emptySquares[5] === "X"]) {
      emptySquares[4] === "0";
    } else if ([emptySquares[6] === "X" && emptySquares[7] === "X"]) {
      emptySquares[8] === "0";
    } else if ([emptySquares[7] === "X" && emptySquares[8] === "X"]) {
      emptySquares[6] === "0";
    } else if ([emptySquares[6] === "X" && emptySquares[8] === "X"]) {
      emptySquares[7] === "0";
    } else if ([emptySquares[0] === "X" && emptySquares[3] === "X"]) {
      emptySquares[6] === "0";
    } else if ([emptySquares[0] === "X" && emptySquares[6] === "X"]) {
      emptySquares[3] === "0";
    } else if ([emptySquares[3] === "X" && emptySquares[6] === "X"]) {
      emptySquares[0] === "0";
    } else if ([emptySquares[1] === "X" && emptySquares[4] === "X"]) {
      emptySquares[7] === "0";
    } else if ([emptySquares[1] === "X" && emptySquares[7] === "X"]) {
      emptySquares[4] === "0";
    } else if ([emptySquares[4] === "X" && emptySquares[7] === "X"]) {
      emptySquares[1] === "0";
    } else if ([emptySquares[2] === "X" && emptySquares[5] === "X"]) {
      emptySquares[8] === "0";
    } else if ([emptySquares[2] === "X" && emptySquares[8] === "X"]) {
      emptySquares[5] === "0";
    } else if ([emptySquares[5] === "X" && emptySquares[8] === "X"]) {
      emptySquares[2] === "0";
    } else if ([emptySquares[0] === "X" && emptySquares[4] === "X"]) {
      emptySquares[8] === "0";
    } else if ([emptySquares[0] === "X" && emptySquares[8] === "X"]) {
      emptySquares[4] === "0";
    } else if ([emptySquares[4] === "X" && emptySquares[8] === "X"]) {
      emptySquares[0] === "0";
    } else if ([emptySquares[2] === "X" && emptySquares[4] === "X"]) {
      emptySquares[6] === "0";
    } else if ([emptySquares[2] === "X" && emptySquares[6] === "X"]) {
      emptySquares[4] === "0";
    } else if ([emptySquares[4] === "X" && emptySquares[6] === "X"]) {
      emptySquares[2] === "0";
    }
    done === true;
  } while (done === false);

  console.log(getTable(emptySquares));
}
module.exports = {
  computerTurnh,
};
