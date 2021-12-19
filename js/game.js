function myChessFile() {
  const { Chess } = require("chess.js");
  const chessGame = new Chess();
  window.addEventListener("load", () => {
    console.log("Game Board loaded. White player starts.");
  });
  
  function getValidMoves(e) {
    console.log("1");
    const otherSquares = document.querySelectorAll(".rankFile > .currentMove");
    for (const s of otherSquares) {
      s.classList.remove("currentMove");
    }

    const existingValidMoves = document.querySelectorAll(
      ".rankFile > .validMove"
    );
    for (const x of existingValidMoves) {
      x.classList.remove("validMove");
    }

    //add currentMove class to square being clicked;
    const myTarget = e.target;
    let piece = chessGame.get(myTarget.innerHTML); //piece object {type:"", color:""};

    if (piece !== null) {
      myTarget.classList.add("currentMove");
    }

    if (myTarget.classList.contains("currentMove")) {
      const squareInnerHtml = myTarget.innerHTML;
      moves = chessGame.moves({ square: squareInnerHtml, verbose: true }); //array;

      //put capture move in this function scope somewhere;
      if (moves.length > 0) {
        for (let h of allSquares) {
          for (let k of moves) {
            if (h.innerHTML === k.to) {
              h.classList.add("validMove");
              if (k.hasOwnProperty("captured") === true) {
                h.classList.add("captured");
                san = k.san;
                fromK = k.from;
                pieceK = k.piece; //piece that is going to be moved; lowercase for both colors;
                captured = k.captured;
                whitePieceCap = captured.toUpperCase();
                console.log("K properties set!");
              }
              h.addEventListener("click", makeMoves);
            }
          }
        }
      } else {
        e.target.addEventListener("click", makeMoves);
      }
    }
  }

  function makeMoves(e) {
    console.log("2");
    console.log("make moves...", moves);
    let turn = chessGame.turn();
    if (moves.length == 0) {
    
      if (e.target.classList.contains("captured")) {
        if (turn === "w") {
          for (const f of allSquares) {
            if (f.innerHTML === fromK) {
              const whiteMoveP = pieceK.toUpperCase();
              console.log(`Piece to move:${whiteMoveP}, Captured:${captured}`);
              f.classList.remove(whiteMoveP);
              //e.target.classList.replace(captured, whiteMoveP);
              e.target.classList.remove(captured);
              e.target.classList.add(whiteMoveP);
              chessGame.move(san);
            }
          }
        } else if (turn === "b") {
      
          for (const f of allSquares) {
            if (f.innerHTML === fromK) {
              console.log(`Piece to move:${pieceK}, Captured:${whitePieceCap}`);
              f.classList.remove(pieceK);
              //e.target.classList.replace(whitePieceCap,pieceK);
               e.target.classList.remove(whitePieceCap);
               e.target.classList.add(pieceK);
              chessGame.move(san);
            }
          }
        }
         for (const b of allSquares) {
           if (b.classList.contains("captured")) {
             b.classList.remove("captured");
           }
         }
      }
    } else if (moves.length > 0) {
      for (const moveObj of moves) {
        if (moveObj.to === e.target.innerHTML) {
          //update DOM movement;
          const piece2 = chessGame.get(moveObj.from);
          if (moveObj.color === "w") {
            const whitePiece = piece2.type.toUpperCase();
            e.target.classList.add(whitePiece);
            for (const sq of allSquares) {
              if (sq.innerHTML === moveObj.from) {
                sq.classList.remove(whitePiece);
                console.log(`${whitePiece} removed.`);
                break;
              }
            }
          } else if (moveObj.color === "b") {
            e.target.classList.add(piece2.type);
            for (const sq of allSquares) {
              if (sq.innerHTML === moveObj.from) {
                sq.classList.remove(piece2.type);
                console.log(`${piece2.type} removed.`);
                break;
              }
            }
          }

          //update chess engine;
          const chessMove = chessGame.move(moveObj.san);
          console.log(chessMove);
        }
      }
    }
    
    
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
    console.log(chessGame.ascii());
    turn = chessGame.turn();
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

  let moves;
  let san;
  let fromK;
  let pieceK;
  let captured;
  let whitePieceCap;

  const allSquares = document.querySelectorAll(".rankFile > div");
  const rankFile = document.getElementsByClassName("chessboard")[0].children;

  //Run event listeners;
  for (const a of allSquares) {
    a.addEventListener("click", getValidMoves);
  }
}

myChessFile();

/**
 * for (const moveObj of moves) {
      if (moveObj.to === e.target.innerHTML) {
        //update DOM movement;
        const piece2 = chessGame.get(moveObj.from);
        if (moveObj.color === "w") {
          const whitePiece = piece2.type.toUpperCase();
          e.target.classList.add(whitePiece);
          for (const sq of allSquares) {
            if (sq.innerHTML === moveObj.from) {
              sq.classList.remove(whitePiece);
              console.log(`${whitePiece} removed.`);
              break;
            }
          }
        } else if (moveObj.color === "b") {
          e.target.classList.add(piece2.type);
          for (const sq of allSquares) {
            if (sq.innerHTML === moveObj.from) {
              sq.classList.remove(piece2.type);
              console.log(`${piece2.type} removed.`);
              break;
            }
          }
        }

        //update chess engine;
        const chessMove = chessGame.move(moveObj.san);
        console.log(chessMove);

  
      }
    }
 * 
 * for (i = 0; i <= 7; i++) {
    for (j = 0; j <= 7; j++) {
      const mySquares = rankFile[i].children[j];
      mySquares.addEventListener("click", getValidMoves, true);
    }
  }
   *     for (const validEle of validMoves) {
      for (const movesObj of moves) {

          if (movesObj.color === "w") {
            const whitePiece = movesObj.piece.toUpperCase();
            console.log(
              `Chess piece is ${whitePiece}, color is ${movesObj.color}`
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

              if (Object.keys(chessMove).includes("captured") === true) {
                validEle.classList.remove(chessMove.captured);
                console.log(`${chessMove.captured} has been captured!`);
              }
            }
          } else if (movesObj.color === "b") {
            console.log(
              `Chess piece is ${movesObj.piece}, color is ${movesObj.color}`
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
              console.log(chessMove);

              if (Object.keys(chessMove).includes("captured") === true) {
                const capturedWhite = chessMove.captured.toUpperCase();
                validEle.classList.remove(capturedWhite);
                console.log(`${capturedWhite} has been captured!`);
              }
            }
          }
         


        
      }
    }
   *   for (i = 0; i <= 7; i++) {
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

            //NOTE: Update chess engine first, then update DOM;
            //Make the DOM copy the results of chess.ascii;
            //Try separate functions: 1 for valid moves, 1 for a chess move;

            
          }
        }
      });
    }
  }
   */
