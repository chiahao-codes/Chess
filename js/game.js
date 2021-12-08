function myChessFile() {
  const { Chess } = require("chess.js");
  const chessGame = new Chess();
  console.log(chessGame.ascii());

  const myDomBoard = document.getElementsByClassName("chessboard");
  const rankFile = myDomBoard[0].children;
  console.log(rankFile); //HtmlCollection of rankFile arrays, live;

  for (i = 0; i <= 7; i++) {
    for (j = 0; j <= 7; j++) {
      const squares = rankFile[i].children[j];
      squares.addEventListener("click", () => {
        squares.classList.add("currentMove");
        if (squares.classList.contains("currentMove")) {
          const squareInnerHtml = squares.innerHTML;
          console.log(squareInnerHtml);
          const moves = chessGame.moves({square:squareInnerHtml});
          console.log(moves);
        }
      });
    }
  }
}

myChessFile();


