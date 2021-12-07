function myChessFile() {
  const { Chess } = require("chess.js");
  const chessGame = new Chess();
  chessGame.clear();
  console.log(chessGame.ascii());

  const myDomBoard = document.getElementsByClassName("chessboard");
  const rankFile = myDomBoard[0].children;
  console.log(rankFile);

  for (i = 0; i <= 7; i++){
    const arr = new Array();
    arr.push(rankFile[i]);
    console.log(arr);
    for (j = 0; j <= 7; i++){
      //add event listener to each square;
      
    }
  }
}

myChessFile();


