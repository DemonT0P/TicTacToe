/*ADD A WAY TO STOP THE GAME WHEN SOMEONE WINSF */

const Player = (name) => {
  let points = 0;
  let simbol;

  const getName = () => {
    return name;
  };

  const getPoints = () => {
    return points;
  };
  const addPoint = () => {
    points++;
  };
  const setSimbol = (choosenSimbol) => {
    simbol = choosenSimbol;
  };
  const getSimbol = () => {
    return simbol;
  };
  return { getName, getPoints, addPoint, setSimbol, getSimbol };
};

const displayControl = (() => {
  document.querySelector(".header__clean").addEventListener("click", () => {
    GameBoard.cleanBoard();
    Game.setTurn();
    document.querySelector(".gameboard").style.pointerEvents = "auto";
  });

  const drawSimbol = (index, simbol) => {
    document.querySelector(`[data-index="${index}"]`).innerText = `${simbol}`;
  };

  const lostByDraw = () => {
    document.querySelector(".header__player-turn").innerText =
      "DRAAAAAWWWWWWWWW";
  };

  const cleanBoard = () => {
    for (let i = 0; i < 9; i++) {
      document.querySelector(`[data-index="${i}"]`).innerText = ``;
    }
  };

  const setWinner = (simbol) => {
    document.querySelector(".header__player-turn").innerText = `${Game.winner(
      simbol
    )} won the game!!!!`;
  };

  const cleanWinner = () => {
    document.querySelector(".header__player-turn").innerText = "&nbsp";
  };

  return { drawSimbol, lostByDraw, cleanBoard, setWinner };
})();

const GameBoard = (() => {
  let board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

  const setBoardIndex = (index, simbol) => {
    board[index] = simbol;
  };

  const draw = () => {
    document.querySelectorAll(".gameboard__box").forEach((box) => {
      box.addEventListener("click", () => {
        if (board[box.dataset.index] == -1) {
          if (Game.changeTurn() == "0") {
            displayControl.drawSimbol(box.dataset.index, "O");
            setBoardIndex(box.dataset.index, "O");
          } else {
            displayControl.drawSimbol(box.dataset.index, "X");
            setBoardIndex(box.dataset.index, "X");
          }
        }
        if (verifyDraw()) displayControl.lostByDraw();
        verifyWin();
      });
    });
  };

  const verifyDraw = () => {
    for (let i = 0; i < 9; i++) {
      if (board[i] == -1) {
        return false;
      }
    }
    return true;
  };

  const cleanBoard = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = -1;
    }
    displayControl.cleanBoard();
  };

  const verifyWin = () => {
    for (let i = 0; i < 3; i++) {
      if (board[0 + i] == "X" && board[3 + i] == "X" && board[6 + i] == "X") {
        displayControl.setWinner("X");
        Game.setTurn();
        document.querySelector(".gameboard").style.pointerEvents = "none";
        break;
      }
      if (board[0 + i] == "O" && board[3 + i] == "O" && board[6 + i] == "O") {
        displayControl.setWinner("O");
        Game.setTurn();
        document.querySelector(".gameboard").style.pointerEvents = "none";
        break;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (board[0 + i] == "X" && board[1 + i] == "X" && board[2 + i] == "X") {
        displayControl.setWinner("X");
        Game.setTurn();
        document.querySelector(".gameboard").style.pointerEvents = "none";
        break;
      }
      if (board[0 + i] == "O" && board[1 + i] == "O" && board[2 + i] == "O") {
        displayControl.setWinner("O");
        Game.setTurn();
        document.querySelector(".gameboard").style.pointerEvents = "none";
        break;
      }
    }

    if (board[0] == "O" && board[4] == "O" && board[8] == "O") {
      displayControl.setWinner("O");
      Game.setTurn();
      document.querySelector(".gameboard").style.pointerEvents = "none";
    }
    if (board[2] == "O" && board[4] == "O" && board[6] == "O") {
      displayControl.setWinner("O");
      Game.setTurn();
      document.querySelector(".gameboard").style.pointerEvents = "none";
    }

    if (board[0] == "X" && board[4] == "X" && board[8] == "X") {
      displayControl.setWinner("X");
      Game.setTurn();
      document.querySelector(".gameboard").style.pointerEvents = "none";
    }
    if (board[2] == "X" && board[4] == "X" && board[6] == "X") {
      displayControl.setWinner("X");
      Game.setTurn();
      document.querySelector(".gameboard").style.pointerEvents = "none";
    }
  };

  return { draw, board, verifyDraw, cleanBoard };
})();

const Game = (() => {
  let turn;
  let dialog = document.querySelector(".dialog");
  let p1, p2;

  const winner = (simbol) => {
    if (p1.getSimbol() == simbol) return p1.getName();
    else return p2.getName();
  };

  const changeTurn = () => {
    if (turn == 0) {
      turn = 1;
      return 0;
    } else {
      turn = 0;
      return 1;
    }
  };

  const setTurn = () => {
    turn = 1;
  };
  document.querySelector(".header__play").addEventListener("click", () => {
    dialog.showModal();
  });

  const setPlayer = () => {
    p1 = Player(document.querySelector("#p1").value);
    p1.setSimbol("X");
    p2 = Player(document.querySelector("#p2").value);
    p2.setSimbol("O");
  };

  document.querySelector(".dialog__start").addEventListener("click", (e) => {
    e.preventDefault();
    GameBoard.cleanBoard();
    document.querySelector(".gameboard").style.pointerEvents = "auto";
    setPlayer();
    dialog.close();
    GameBoard.draw();
  });

  return {
    winner,
    changeTurn,
    setTurn,
  };
})();
