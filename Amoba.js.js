const {
  randomIntBetweenTwoNumbers,
  getTable,
  computerTurnh2,
} = require("./funkciok");

const readline = require("readline");

const { count } = require("console");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let emptySquares = ["", "", "", "", "", "", "", "", ""];
function gameMode() {
  return new Promise((resolve, reject) => {
    rl.question("Do you want hard mode? Yes or no?  ", (answer) => {
      if (answer.toLowerCase() === "no") {
        console.log("Normal mode");
        resolve(false);
      } else if (answer.toLowerCase() === "yes") {
        console.log("Hard mode");
        resolve(true);
      }
    });
  });
}

function introQuestion(end) {
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
      winner = 1;
    }

    let xCount = array.filter((element) => element === "X").length;
    if (xCount === 3) {
      winner = 0;
    }
  }
  switch (winner) {
    case 0:
      console.log(getTable(emptySquares));
      console.log("You Win!");
      resolve(true);

      break;

    case 1:
      console.log("You Loose NAB!");
      resolve(true);

      break;
  }
}
function computerTurne() {
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

const turnQuestion = (playerStart) => {
  return new Promise((resolve, reject) => {
    if (playerStart === true) {
      rl.question("Place your X in square ", (answer) => {
        if (
          emptySquares[answer - 1] !== "0" &&
          emptySquares[answer - 1] !== "X"
        ) {
          emptySquares[answer - 1] = "X";
          winCheck(resolve);
          computerTurne();
          winCheck(resolve);
        } else {
          console.log(
            "The square you choose is already taken.Please pick another square"
          );
        }
        resolve(false);
      });
    } else {
      const countX = emptySquares.filter((x) => {
        if (x === "X") {
          return true;
        } else {
          return false;
        }
      }).length;
      const countO = emptySquares.filter((x) => {
        if (x === "0") {
          return true;
        } else {
          return false;
        }
      }).length;

      if (countX === countO) {
        computerTurne();
      }

      winCheck(resolve);
      rl.question("Place your X in square ", (answer) => {
        if (
          emptySquares[answer - 1] !== "0" &&
          emptySquares[answer - 1] !== "X"
        ) {
          emptySquares[answer - 1] = "X";
          winCheck(resolve);
        } else {
          console.log(
            "The square you choose is already taken.Please pick another square"
          );
        }
        resolve(false);
      });
    }
  });
};

async function game() {
  const hmode = await gameMode();
  if (hmode === false) {
    const playerStart = await introQuestion();

    let end = false;
    do {
      end = await turnQuestion(playerStart);
    } while (end === false);
  } else if (hmode === true) {
  }
  rl.close();
}

game();
