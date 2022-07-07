function myChessFile() {
  const { Chess } = require("chess.js");
  const chessGame = new Chess();

  window.addEventListener("load", () => {
    //loads local storage...
    console.log(" Sup...");
  });

  const allSquares = document.querySelectorAll(".rankFile > div");
  let turn = chessGame.turn(), moves, existingValidMoves;
  localStorage.setItem("playerTurn", turn);
  localStorage.removeItem("gameStatus");
  let gameStatus = localStorage.getItem("gameStatus");
  
  if (!gameStatus) {
    //populate localStorage via getSquare();
    //update the DOM via localStorage;
    populateLocalStoragePieces(allSquares);
    updateDomId(allSquares);
    for (let squares of allSquares) {
      squares.addEventListener("click", getValidMoves);
    }
  } else {
    //run preserveDom function;
    //draw from local storage to populate the DOM.
    for (let squares of allSquares) {
      squares.addEventListener("click", getValidMoves);
    }
  }

  function updateDomId(allsquares) {
    //add id to DOM element based on local storage;
    for (let i = 0; i < allsquares.length; i++){
      let domSquare = allsquares[i].innerText, domElement = allsquares[i];
      let storagePieceValue = localStorage.getItem(domSquare);
      if (storagePieceValue) {
        let domPiece = storagePieceValue.slice(0, 1);
        domElement.setAttribute("id", domPiece);
      }
    }
  }

  function populateLocalStoragePieces(allsquares) {
    //populate local storage;
    for (let i = 0; i < allsquares.length; i++) {
      let square = allsquares[i].innerText;
      let chessPiece = chessGame.get(square);
      if (chessPiece) {
        let pieceType = chessPiece.type;
        let pieceColor = chessPiece.color;
        if (pieceColor == "w") {
          pieceType = pieceType.toUpperCase();
        }
        let squarePieceTypeColor = `${pieceType}${pieceColor}`;
        let storagePieceKey = "";
        storagePieceKey += square;
       localStorage.setItem(storagePieceKey, squarePieceTypeColor);
      }
    }
  }

  function preserveDomCurrentValidCapPromo() {
    //updates dom with saved info: current move, valid moves, captured, promotion;
  }


  function getValidMoves(e) {
    //add currentMove class to square being clicked;
    localStorage.setItem("gameStatus", "inProgress");
    const myTarget = e.target;
    const squareInnertext = myTarget.innerText;

    const otherSquares = document.querySelectorAll(".rankFile > .currentMove");
    existingValidMoves = document.querySelectorAll(".rankFile > .validMove");

    for (const s of otherSquares) {
      s.classList.remove("currentMove");
    }

    moves = chessGame.moves({ square: squareInnertext, verbose: true }); //array;
    console.log(`Valid moves: ${moves}`);

    if (moves.length > 0 && moves[0].color === localStorage.getItem("playerTurn")) {
      removeCapturedPiece(allSquares, null);
      noMoreValid(existingValidMoves);
      localStorage.setItem("currentMove", moves[0].from);
      myTarget.classList.add("currentMove");
      
      //add valid moves, capture, promotion to localStorage and DOM;
      let validMoves = "", captured = "", promotion = "";
      for (let moveTo of moves) {
        for (let squares of allSquares) {
          validMoves += moveTo.to;
          if (squares.innerText === moveTo.to) {
            squares.classList.add("validMove");
            if (moveTo.captured) {
              captured += moveTo.to;
              squares.setAttribute("captured", "");
            }
            if (moveTo.promotion) {
              promotion += "";
              squares.setAttribute("promotion", "");
            }
            squares.addEventListener("click", makeMoves);
          }
        }
      }
      localStorage.setItem("validMoves", validMoves);
      localStorage.setItem("captured", captured);
      localStorage.setItem("promotion", promotion);
          
    } else {
      noMoreValid(existingValidMoves); //removes "valid" from squares.
      removeCapturedPiece(allSquares, null); //removes "captured" class name
    }
  }

  function noMoreValid(preExistingValids) {
    localStorage.removeItem("currentMove");
    localStorage.removeItem("validMoves");

    for (const x of preExistingValids) {
      if (x.classList.contains("validMove")) {
        x.classList.remove("validMove");
      }
    }
  }
  
  function removePawn(ev) {
    if (ev.classList.contains("P") && ev.classList.contains("Q")) {
      ev.classList.remove("P");
    } else if (ev.classList.contains("p") && ev.classList.contains("q")) {
      ev.classList.remove("p");
    }
  }

  //remove captured piece
  function removeCapturedPiece(all, pie) {
    localStorage.removeItem("captured");
    localStorage.removeItem("promotion");
    /** for (const f of all) {
      if (f.innerText === legalFromMove && pie !== null) {
        f.classList.remove(pie);
      }
      if (f.hasAttribute("captured")) {
        f.removeAttribute("captured");
      }
      if (f.hasAttribute("promotion")) {
        f.removeAttribute("promotion");
      }
    } */
  }

  function makeMoves(e) {
    const movedTo = e.target.innerText;
    existingValidMoves = document.querySelectorAll(".rankFile > .validMove");
    if (moves.length > 0) {
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
            removePawn(e.target);
            removeCapturedPiece(allSquares, whiteMovePiece);

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
            removePawn(e.target);
            removeCapturedPiece(allSquares, blackMovePiece);
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
    localStorage.setItem("playerTurn", turn);

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
  
}

myChessFile();
