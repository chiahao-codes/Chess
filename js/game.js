function myChessFile() {
  const { Chess } = require("chess.js");
  const chessGame = new Chess();
  window.addEventListener("load", () => {
    console.log(" Sup. Game Board loaded. White player starts.");
  });

  function getValidMoves(e) {
    console.log("1");
    //add currentMove class to square being clicked;
    const myTarget = e.target;
    let piece = chessGame.get(myTarget.innerText); //piece object {type:"", color:""};
    console.log(piece);
    turn = chessGame.turn();
    const otherSquares = document.querySelectorAll(".rankFile > .currentMove");
    existingValidMoves = document.querySelectorAll(".rankFile > .validMove");

     for (const s of otherSquares) {
       s.classList.remove("currentMove");
     }

    if (piece !== null && piece.color === turn) {
      myTarget.classList.add("currentMove");
    } else if (piece == null) {
      //blank;
    } else if (piece.color !== turn && e.target.classList.contains("validMove")) {
      //empty;
    } else if (piece.color !== turn && !e.target.classList.contains("validMove")) {
      noMoreValid(existingValidMoves);
      removeCP(allSquares, null);
    }

    if (myTarget.classList.contains("currentMove")) {
      const squareInnertext = myTarget.innerText;
      moves = chessGame.moves({ square: squareInnertext, verbose: true }); //array;
      removeCP(allSquares, null);
      noMoreValid(existingValidMoves);
      
      if (moves.length > 0) {
        for (let h of allSquares) {
          for (let k of moves) {
            if (h.innerText === k.to) {
              
              h.classList.add("validMove");

              if (k.captured) {
                h.setAttribute("captured", "");
              }
              if (k.promotion) {
                h.setAttribute("promotion", "");
              }

              fromK = k.from;
              colorK = k.color;
              pieceK = k.piece;
              whiteMoveP = pieceK.toUpperCase();
              console.log("K properties set!");
              h.addEventListener("click", makeMoves);
            }
          }
        }
      } 
    }
  }

  function noMoreValid(v) {
    for (const x of v) {
      if (x.classList.contains("validMove")) {
        x.classList.remove("validMove");
      }
    }
  }
  
  function removeP(ev) {
    if (ev.classList.contains("P") && ev.classList.contains("Q")) {
      ev.classList.remove("P");
    } else if (ev.classList.contains("p") && ev.classList.contains("q")) {
      ev.classList.remove("p");
    }
  }

  function removeCP(all, pie) {
    for (const f of all) {
      if (f.innerText === fromK && pie !== null) {
        console.log("pie:", pie);
        f.classList.remove(pie);
      }
      if (f.hasAttribute("captured")) {
        f.removeAttribute("captured");
      }
      if (f.hasAttribute("promotion")) {
        f.removeAttribute("promotion");
      }
    }
  }

  function makeMoves(e) {
    const movedTo = e.target.innerText;
    existingValidMoves = document.querySelectorAll(".rankFile > .validMove");
    if (moves.length > 0) {
      console.log("3");
      console.log(moves);
      for (const moveObj of moves) {
        if (moveObj.to === e.target.innerText) {
          if (moveObj.color === "w") {
            const whiteMovePiece = moveObj.piece.toUpperCase();

            if (e.target.hasAttribute("captured")) {
              e.target.removeAttribute("captured");
              e.target.classList.remove(moveObj.captured);
            }

            if (e.target.hasAttribute("promotion")) {
              e.target.removeAttribute("promotion");
              e.target.classList.add("Q");
              chessGame.move({
                from: moveObj.from,
                to: movedTo,
                promotion: "q",
              });
            } else if (e.target.classList.contains("validMove")) {
              e.target.classList.add(whiteMovePiece);
              chessGame.move({ from: moveObj.from, to: movedTo });
            }
            noMoreValid(existingValidMoves);
            removeP(e.target);
            removeCP(allSquares, whiteMovePiece);

          } else if (moveObj.color === "b") {
            const blackMovePiece = moveObj.piece;
            if (e.target.hasAttribute("captured")) {
              e.target.removeAttribute("captured");
              const whitePieceCaptured = moveObj.captured.toUpperCase();
              e.target.classList.remove(whitePieceCaptured);
            }

            if (e.target.hasAttribute("promotion")) {
              e.target.removeAttribute("promotion");
              e.target.classList.add("q");
              chessGame.move({
                from: moveObj.from,
                to: movedTo,
                promotion: "q",
              });
            } else if (e.target.classList.contains("validMove")) {
              e.target.classList.add(blackMovePiece);
              chessGame.move({ from: moveObj.from, to: movedTo });
            }

            noMoreValid(existingValidMoves);
            removeP(e.target);
            removeCP(allSquares, blackMovePiece);
          }
        }
      }
    }

    const gameFen = chessGame.fen();
    const validFen = chessGame.validate_fen(gameFen);
    if (!validFen) console.log("Invalid Fen", validFen);
    const insufficient = chessGame.insufficient_material(gameFen);
    const inCheck = chessGame.in_check(gameFen);
    const checkMate = chessGame.in_checkmate(gameFen);
    const draw = chessGame.in_draw(gameFen);
    const staleMate = chessGame.in_stalemate(gameFen);
    const gameOver = chessGame.game_over(gameFen);

    console.log(chessGame.ascii());
    turn = chessGame.turn();

    if (turn === "b") {
      console.log("Black's turn.");
      if (inCheck) {
        console.log("Black in check.");
      }

      if (checkMate) {
        console.log("Black is checkmated.");
      } else if (draw) {
        console.log("It's a draw.");
      } else if (staleMate) {
        console.log("Black has been stalemated.");
      }
      if (insufficient) {
        console.log("Insufficient material.");
      }
      
      if (gameOver) {
        console.log("Game has ended. Black loses.");
      }
    } else {
      console.log("White's turn.");
      if (inCheck) {
        console.log("White in check.");
      }

      if (checkMate) {
        console.log("White is checkmated.");
      } else if (draw) {
        console.log("It's a draw.");
      } else if (staleMate) {
        console.log("White has been stalemated.");
      }
      if (insufficient) {
        console.log("Insufficient material.")
      }
      if (gameOver) {
        console.log("Game has ended. White loses.");
      }
    }
  }

  let turn;
  let moves;
  let fromK;
  let pieceK;
  let whiteMoveP;
  let whitePieceCap;
  let existingValidMoves;
  const allSquares = document.querySelectorAll(".rankFile > div");

  for (const a of allSquares) {
    a.addEventListener("click", getValidMoves);
  }
}

myChessFile();


/**else {
        console.log("1.5");
        //e.target.addEventListener("click", makeMoves);
      }
 * if (moves.length == 0) {
      if (turn == colorK) {
        console.log("2");
        if (turn === "w") {
          if (e.target.hasAttribute("captured")) {
            e.target.removeAttribute("captured");
            const blackCaptured = ["p", "b", "q", "k", "n", "r"];
            for (const m of blackCaptured) {
              if (e.target.classList.contains(m)) {
                e.target.classList.remove(m);
              }
            }
          }

          if (e.target.hasAttribute("promotion")) {
            e.target.removeAttribute("promotion");
            e.target.classList.add("Q");
            chessGame.move({ from: fromK, to: movedTo, promotion: "q" });
          } else if(e.target.classList.contains("validMove")) {
            e.target.classList.add(whiteMoveP);
            chessGame.move({ from: fromK, to: movedTo });
          }

          noMoreValid(existingValidMoves);
          removeP(e.target);
          removeCP(allSquares, whiteMoveP);

        } else if (turn === "b") {
          if (e.target.hasAttribute("captured")) {
            e.target.removeAttribute("captured");
            const whiteCaptured = ["P", "B", "R", "N", "Q", "K"];
            for (const w of whiteCaptured) {
              if (e.target.classList.contains(w)) {
                e.target.classList.remove(w);
              }
            }
          }
          if (e.target.hasAttribute("promotion")) {
            e.target.removeAttribute("promotion");
            e.target.classList.add("q");
            chessGame.move({ from: fromK, to: movedTo, promotion: "q" });
          } else if(e.target.classList.contains("validMove")) {
            e.target.classList.add(pieceK);
            chessGame.move({ from: fromK, to: movedTo });
          }

          noMoreValid(existingValidMoves);
          removeP(e.target);
          removeCP(allSquares, pieceK);
        }
      }
    } */