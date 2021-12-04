
function myChessFile() {
  const myDomBoard = document.querySelector(".chessboard");
  console.log(myDomBoard);
  const { Chess } = require("chess.js");
  const chessGame = new Chess();
  console.log(chessGame.ascii());
  console.log("Hello");  
}


