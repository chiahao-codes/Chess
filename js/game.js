function myChessFile() {
  const { Chess } = require("chess.js");
  const chessGame = new Chess();
  chessGame.clear();
  console.log(chessGame.ascii());

  const myDomBoard = document.getElementsByClassName("chessboard");
  const rankFile = myDomBoard[0].children;
  console.log(rankFile); //HtmlCollection of rankFile arrays, live;

  for (i = 0; i <= 7; i++){
    for (j = 0; j <= 7; j++){
      rankFile[i].children[j].addEventListener("click", () => {
        console.log("Hey...");
      })
    }
  }
}

myChessFile();


