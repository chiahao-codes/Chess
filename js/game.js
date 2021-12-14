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
                if (
                  h.innerHTML === k ||
                  h.innerHTML === k.substring(1) ||
                  h.innerHTML === k.substring(2) ||
                  h.innerHTML === k.substring(1, 3) ||
                  h.innerHTML === k.substring(1, 4) ||
                  h.innerHTML === k.substring(2, 4) ||
                  h.innerHTML === k.substring(2, 3)
                ) {
                  console.log("Good Luck!");
                  h.classList.add("validMove");
                }
              }
            }
            const validMoves = document.querySelectorAll(".validMove");
            const currentMove2 = document.querySelector(".currentMove");
            const arrPieces = ["p", "b", "q", "n", "k", "r", "P", "R", "N", "B", "Q", "K"];
            if (validMoves.length > 0) {
              validMoves.forEach((ele) => {
                ele.addEventListener("click", () => {
                  //remove chess piece class name and add it to ele.classList;
                  currentMove2.classList.forEach((elem) => {
                    if (arrPieces.includes(elem)) {
                      console.log(elem);
                      currentMove2.classList.remove(elem);
                      ele.classList.replace("currentMove", elem);
                      //update chess engine move();
                      const chessMove = chessGame.move({
                        from: currentMove2.innerHTML,
                        to: ele.innerHTML,
                      });
                      if (arrPieces.includes(chessMove.captured)) {
                        if (arrPieces.includes(ele.classList[1])) {
                          ele.classList.remove(ele.classList[1]);
                        }
                      }
                      console.log(chessMove);
                    }
                  });
                  const gameFen = chessGame.fen();
                  console.log(`Fen: ${gameFen}`);
                  console.log(chessGame.ascii());
                  let turn = chessGame.turn();
                  const inCheck = chessGame.in_check(gameFen);
                  if (turn == "b") {
                    console.log("Black side's turn.");
                    if (inCheck) {
                      console.log("Black side in check.");
                    }
                  } else {
                    console.log("White side's turn.");
                    if (inCheck) {
                      console.log("Black side in check.");
                    }
                  }
                  
                  
                });
              });
            }
          }
        }
      });
    }
  }
}

myChessFile();
