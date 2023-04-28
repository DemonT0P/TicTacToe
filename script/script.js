const Player = (name) => {
  let points = 0;
  const getName = () => {
    return name;
  };
  const getPoints = () => {
    return points;
  };
  const addPoint = () => {
    points++;
  };
  return { getName, getPoints, addPoint };
};

const displayControl = (() => {
  const addBoard = (index) => {
    console.log("ADDED TO " + index);
  };
  const checkWin = (array) => {};
  return { addBoard, checkWin };
})();

const GameBoard = (() => {
  let board = new Array(9);
  const draw = () => {};
  return { draw };
})();

const Game = (() => {
  let turn = 0;
  let pointsToWin = 3;
  let p1 = Player("Player 1");
  let p2 = Player("Player 2");
  const verifyWin = (p1, p2) => {
    if (p1 == pointsToWin) {
      console.log("gANHOU");
    }
  };
  return { verifyWin };
})();
