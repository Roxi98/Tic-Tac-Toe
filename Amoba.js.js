const { randomIntBetweenTwoNumbers, getTable } = require("./functions.js");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let emptySquares = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function computerTurnHard(playerStart) {
  if (emptySquares[4] !== "X" && emptySquares[4] !== "0") {
    emptySquares[4] = "0";
  } else if (emptySquares[4] === "0" || emptySquares[4] === "X") {
    let winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let done = false;
    winningLines.forEach((winningLine) => {
      const [a, b, c] = winningLine;
      const winningPossiblities = [
        [a, b, c],
        [a, c, b],
        [b, c, a],
      ];
      winningPossiblities.forEach((winningPossiblity) => {
        if (
          emptySquares[winningPossiblity[0]] === "0" &&
          emptySquares[winningPossiblity[1]] === "0" &&
          emptySquares[winningPossiblity[2]] !== "X" &&
          emptySquares[winningPossiblity[2]] !== "0" &&
          !done
        ) {
          emptySquares[winningPossiblity[2]] = "0";
          done = true;
        } else if (
          emptySquares[winningPossiblity[0]] === "X" &&
          emptySquares[winningPossiblity[1]] === "X" &&
          emptySquares[winningPossiblity[2]] !== "X" &&
          emptySquares[winningPossiblity[2]] !== "0" &&
          !done
        ) {
          emptySquares[winningPossiblity[2]] = "0";
          done = true;
        }
      });
    });

    const countX = emptySquares.filter((square) => square === "X").length;
    const countO = emptySquares.filter((square) => square === "0").length;

    if (countX > countO && !done) {
      computerTurnEasy();
    } else if (!playerStart && countX === countO && !done) {
      computerTurnEasy();
    }
  }
  console.log(getTable(emptySquares));
}

function gameModeSelect() {
  return new Promise((resolve, reject) => {
    rl.question("Do you want hard mode? Yes or no?  ", (answer) => {
      if (answer.toLowerCase() === "no") {
        console.log("Easy mode");
        resolve(false);
      } else if (answer.toLowerCase() === "yes") {
        console.log("Hard mode");
        resolve(true);
      }
    });
  });
}

function introQuestion() {
  return new Promise((resolve, reject) => {
    rl.question("Do you want to start? ", (answer) => {
      if (answer.toLowerCase() === "yes") {
        console.log("Its your turn.Please pick a square to place your X");
        console.log(getTable(emptySquares));

        resolve(true);
      } else if (answer.toLowerCase() === "no") {
        resolve(false);
      }
    });
  });
}
function winCheck(resolve) {
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
  let winner = "";
  for (let i = 0; i < winCondition.length; i++) {
    let array = winCondition[i];
    let oCount = array.filter((element2) => element2 === "0").length;
    if (oCount === 3) {
      winner = "computer";
    }
    let xCount = array.filter((element) => element === "X").length;
    if (xCount === 3) {
      winner = "player";
    }
  }
  const countX = emptySquares.filter((square) => square === "X").length;
  const countO = emptySquares.filter((square) => square === "0").length;
  if (countX + countO === 9) {
    winner = "noone";
  }
  if (winner === "player") {
    console.log(getTable(emptySquares));
    console.log("You Win!");
    resolve(true);
  } else if (winner === "computer") {
    console.log(getTable(emptySquares));
    console.log("You Loose NAB!");
    resolve(true);
  } else if (winner === "noone") {
    console.log(getTable(emptySquares));
    console.log("Draw! Better luck next time!");
    resolve(true);
  }
}
function computerTurnEasy() {
  let computerAnswer = 0;
  let done = false;

  do {
    computerAnswer = randomIntBetweenTwoNumbers(0, 8);
    if (
      emptySquares[computerAnswer] !== "0" &&
      emptySquares[computerAnswer] !== "X"
    ) {
      done = true;
      emptySquares[computerAnswer] = "0";
    }
  } while (done === false);
  console.log(getTable(emptySquares));
}

const turnQuestion = (computerTurn, playerStart) => {
  return new Promise((resolve, reject) => {
    if (playerStart) {
      questionLogic(playerStart, computerTurn, resolve);
    } else {
      if (calculateDifference()) {
        computerTurn(playerStart);
      }
      winCheck(resolve);
      questionLogic(playerStart, computerTurn, resolve);
    }
  });
};

const calculateDifference = () => {
  const countX = emptySquares.filter((square) => square === "X").length;
  const countO = emptySquares.filter((square) => square === "0").length;
  return countX === countO;
};

const questionLogic = (playerStart, computerTurn, resolve) => {
  rl.question("Place your X in square ", (answer) => {
    if (emptySquares[answer - 1] !== "0" && emptySquares[answer - 1] !== "X") {
      emptySquares[answer - 1] = "X";
      const toResolve = winCheck();
      if (toResolve) {
      }
      if (playerStart) {
        computerTurn();
        winCheck(resolve);
      }
    } else {
      console.log(
        "The square you choose is already taken.Please pick another square"
      );
    }
    resolve(false);
  });
};

const play = async (computerTurn) => {
  const playerStart = await introQuestion();
  let end = false;
  do {
    end = await turnQuestion(computerTurn, playerStart);
  } while (end === false);
  rl.close();
};

async function game() {
  const hardMode = await gameModeSelect();
  if (hardMode) {
    await play(computerTurnHard);
  } else {
    await play(computerTurnEasy);
  }
}

game();
