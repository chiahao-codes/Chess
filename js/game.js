function myChessFile() {
  const { Chess } = require("chess.js");
  const chessGame = new Chess();
  console.log(chessGame.ascii());

  window.addEventListener("load", () => {
    console.log("Game Board loaded. White's turn.");
  });

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

        if (mySquares.classList.contains("currentMove")) {
          let moves;
          const allSquares = document.querySelectorAll(".rankFile > div");
          const squareInnerHtml = mySquares.innerHTML;
          moves = chessGame.moves({ square: squareInnerHtml, verbose: true }); //array;

          if (moves.length > 0) {
            for (let h of allSquares) {
              for (let k of moves) {
                if (h.innerHTML === k.to) {
                  h.classList.add("validMove");
                }
              }
            }

            const validMoves = document.querySelectorAll(".validMove"); //elements in a static node list;
            console.log(validMoves);
            let chessMove;

            for (const validEle of validMoves) {
              for (const movesObj of moves) {

                function validClick() {
                  if (movesObj.color === "w") {
                    const whitePiece = movesObj.piece.toUpperCase();
                    console.log(
                      `Chess piece is ${whitePiece}, color is ${movesObj.color}`
                    );

                    validEle.classList.remove(
                      "currentMove",
                      "K",
                      "Q",
                      "N",
                      "P",
                      "B",
                      "R",
                      "q",
                      "k",
                      "b",
                      "p",
                      "n",
                      "r"
                    );
                    validEle.classList.add(whitePiece);
                    console.log(validEle);

                    for (const sq of allSquares) {
                      if (sq.innerHTML === movesObj.from) {
                        sq.classList.remove(whitePiece);
                        console.log(`${whitePiece} removed.`);
                        break;
                      }
                    }

                    //update chess.move();
                    if (validEle.innerHTML === movesObj.to) {
                      console.log(movesObj.from, movesObj.to);
                      chessMove = chessGame.move(
                        { from: movesObj.from, to: movesObj.to },
                        {
                          sloppy: true,
                        }
                      );

                      if (
                        Object.keys(chessMove).includes("captured") === true
                      ) {
                        validEle.classList.remove(chessMove.captured);
                        console.log(`${chessMove.captured} has been captured!`);
                      }
                    }
                  } else if (movesObj.color === "b") {
                    console.log(
                      `Chess piece is ${movesObj.piece}, color is ${movesObj.color}`
                    );

                    validEle.classList.remove(
                      "currentMove",
                      "q",
                      "k",
                      "b",
                      "p",
                      "n",
                      "r",
                      "K",
                      "Q",
                      "N",
                      "P",
                      "B",
                      "R"
                    );
                    validEle.classList.add(movesObj.piece);
                    console.log(validEle);

                    for (const sq of allSquares) {
                      if (sq.innerHTML === movesObj.from) {
                        sq.classList.remove(movesObj.piece);
                        break;
                      }
                    }

                    if (validEle.innerHTML === movesObj.to) {
                      console.log(movesObj.from, movesObj.to);
                      chessMove = chessGame.move(
                        { from: movesObj.from, to: movesObj.to },
                        {
                          sloppy: true,
                        }
                      );

                      if (
                        Object.keys(chessMove).includes("captured") === true
                      ) {
                        const capturedWhite = chessMove.captured.toUpperCase();
                        validEle.classList.remove(capturedWhite);
                        console.log(`${capturedWhite} has been captured!`);
                      }
                    }
                  }
                  console.log(chessGame.ascii());
                  const gameFen = chessGame.fen();
                  console.log(`Fen: ${gameFen}`);
                  const validFen = chessGame.validate_fen(gameFen);
                  if (!validFen) console.log("Invalid Fen", validFen);

                  const inCheck = chessGame.in_check(gameFen);
                  const checkMate = chessGame.in_checkmate(gameFen);
                  const draw = chessGame.in_draw(gameFen);
                  const staleMate = chessGame.in_stalemate(gameFen);
                  const gameOver = chessGame.game_over(gameFen);
                  if (gameOver) {
                    console.log("Game has ended.");
                  }

                  let turn = chessGame.turn();
                  if (turn === "b") {
                    console.log("Black's turn.");
                    if (inCheck) {
                      console.log("Black in check.");
                    } else if (checkMate) {
                      console.log("Black is checkmated.");
                    } else if (draw) {
                      console.log("It's a draw.");
                    } else if (staleMate) {
                      console.log("Black has been stalemated.");
                    }
                  } else {
                    console.log("White's turn.");
                    if (inCheck) {
                      console.log("White in check.");
                    } else if (checkMate) {
                      console.log("White is checkmated.");
                    } else if (draw) {
                      console.log("It's a draw.");
                    } else if (staleMate) {
                      console.log("White has been stalemated.");
                    }
                  }
                }

                validEle.removeEventListener("click", validClick, {
                  once: true,
                });
                validEle.addEventListener("click", validClick, { once: true });
              }
            }
          }
        }
      });
    }
  }
}

myChessFile();
