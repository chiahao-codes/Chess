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
        const existingValidMoves = document.querySelectorAll(
          ".rankFile > .validMove"
        );
        existingValidMoves.forEach((ele) => ele.classList.remove("validMove"));

        //add currentMove class to square being clicked;
        mySquares.classList.add("currentMove");
        
        //calculate eligible moves;
        let moves;
        const allSquares = document.querySelectorAll(".rankFile > div");
        const squareInnerHtml = mySquares.innerHTML;

        if (mySquares.classList.contains("currentMove")) {
          moves = chessGame.moves({ square: squareInnerHtml }); //array;
          if (moves.length > 0) {
            console.log(moves);
            // highlight the squares of the available moves;
            for (let h of allSquares) {
              for (let k of moves) {
                if (h.innerHTML === k) {
                  console.log("Good Luck!");
                  h.classList.add("validMove");
                } else if (h.innerHTML !== k) {
                  if (h.innerHTML === k.substring(1)) {
                    console.log("Good Luck!");
                    h.classList.add("validMove");
                  }
                }
              }
            }
          }
        }

        //place piece on valid square;
        const validMoves = document.querySelectorAll(".validMove");
        if (validMoves.length > 0) {
          console.log(validMoves);
          validMoves.forEach((ele) => {
            ele.addEventListener("click", () => {
              //remove chess piece class name and add it to ele.classList;
              const piece = mySquares.classList[1];
              mySquares.classList.remove(piece);
              ele.classList.replace("currentMove", piece);
              if (ele.classList.contains(undefined)) {
                ele.classList.remove(undefined);
              }
              //update chess engine move();
              const chessMove = chessGame.move({ from: mySquares.innerHTML, to: ele.innerHTML });
              console.log(chessMove);
              console.log(chessGame.ascii());
              let turn = chessGame.turn();
              if (turn == "b") { console.log("Black side's turn.") } else { console.log("White side's turn.") };
            });
          });
        }
      });
    }
  }
}

myChessFile();
