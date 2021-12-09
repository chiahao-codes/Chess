function myChessFile() {
  const { Chess } = require("chess.js");
  const chessGame = new Chess();
  console.log(chessGame.ascii());

  const myDomBoard = document.getElementsByClassName("chessboard");
  const rankFile = myDomBoard[0].children;
  console.log(rankFile); //HtmlCollection of rankFile arrays, live;

  for (i = 0; i <= 7; i++) {
    for (j = 0; j <= 7; j++) {
      const mySquares = rankFile[i].children[j];
      mySquares.addEventListener("click", () => {

        //clear out all other class names first;
        const otherSquares = document.querySelectorAll(
          ".rankFile > .currentMove"
        );
        otherSquares.forEach((ele) => {
          ele.classList.remove("currentMove");
        });
        const existingValidMoves = document.querySelectorAll(".rankFile > .validMove");
        existingValidMoves.forEach((ele) => ele.classList.remove("validMove"));

        //add class name to square being clicked;
        mySquares.classList.add("currentMove");

        //calculate eligible moves;
        let moves;
        if (mySquares.classList.contains("currentMove")) {
          const squareInnerHtml = mySquares.innerHTML;
          moves = chessGame.moves({ square: squareInnerHtml }); //array;
          if (moves.length > 0) {
            console.log(moves);

            // highlight the squares of the available moves;
            const allSquares = document.querySelectorAll(".rankFile > div"); //static nodeList array-like;
            for (let h of allSquares) {
              for (let k of moves) {
                if (h.innerHTML === k) {
                  console.log("Good Luck!");
                  h.classList.add("validMove");
                }
              }
            }
          } else {
            console.log("Invalid move.");
          }
        }
      });
    }
  }
}

myChessFile();


