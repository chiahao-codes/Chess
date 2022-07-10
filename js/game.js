function myChessFile() {
  const { Chess } = require("chess.js");
  const chessGame = new Chess();

  window.addEventListener("load", () => {
    //loads local storage...
    console.log(" Sup...");
  });

  let allSquares = document.querySelectorAll(".rankFile > div");
  let turn = chessGame.turn(),
    moves,
    storedValidMoves,
    storedCurrentMoveSquare;
  localStorage.setItem("playerTurn", turn);
  let gameStatus = localStorage.getItem("gameStatus");

  if (!gameStatus) {
    //populate localStorage via getSquare();
    //update the DOM via localStorage;
    removeValidAndCurrentMoves(allSquares);
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
    for (let i = 0; i < allsquares.length; i++) {
      let domSquare = allsquares[i].innerText,
        domElement = allsquares[i];
      let storagePieceValue = localStorage.getItem(domSquare);
      if (storagePieceValue) {
        let domPiece = storagePieceValue.slice(0, 1);
        domElement.setAttribute("id", domPiece);
      } else {
        //remove id from square;
        domElement.setAttribute("id", "");
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
    const myTarget = e.target;
    const squareInnertext = myTarget.innerText;

    removeValidAndCurrentMoves(allSquares);

    moves = chessGame.moves({ square: squareInnertext, verbose: true }); //array;

    if (
      moves.length > 0 &&
      moves[0].color === localStorage.getItem("playerTurn")
    ) {
      let currentMovePiece = moves[0].piece;
      if (moves[0].color === "w") {
        currentMovePiece = currentMovePiece.toUpperCase();
      }
      let currentMoveSquareAndPiece = moves[0].from + currentMovePiece;

      localStorage.setItem("currentMove", currentMoveSquareAndPiece);
      storedCurrentMoveSquare = localStorage.getItem("currentMove");
      myTarget.classList.add("currentMove");

      //add valid moves, capture, promotion to localStorage and DOM;
      let validMoves = "",
        captured = "",
        promotion = "";
      for (let moveTo of moves) {
        for (let squares of allSquares) {
          if (squares.innerText === moveTo.to) {
            validMoves += moveTo.to;
            squares.classList.add("validMove");
            localStorage.setItem("validMoves", validMoves);
            if (moveTo.captured) {
              captured += moveTo.to;
              squares.setAttribute("captured", "");
              localStorage.setItem("captured", captured);
            }
            if (moveTo.promotion) {
              promotion += "";
              squares.setAttribute("promotion", "");
              localStorage.setItem("promotion", promotion);
            }
            storedValidMoves = localStorage.getItem("validMoves");
            squares.addEventListener("click", makeMoves);
          }
        }
      }
    }
  }

  function removeValidAndCurrentMoves(allsquares) {
    localStorage.removeItem("currentMove");
    localStorage.removeItem("validMoves");

    for (const x of allsquares) {
      if (x.classList.contains("validMove")) {
        x.classList.remove("validMove");
      }
       if (x.classList.contains("currentMove")) {
         x.classList.remove("currentMove");
       }

    }
  }

  function makeMoves(e) {
    localStorage.setItem("gameStatus", "inProgress");
    let currentMoveObj,
      storedValidSquare;
    storedCurrentMoveSquare = storedCurrentMoveSquare.slice(0, 2);
     console.log(storedCurrentMoveSquare);
    if (storedValidMoves) {
      for (let i = 1; i < storedValidMoves.length; i += 2) {
        storedValidSquare = storedValidMoves[i - 1] + storedValidMoves[i];
        console.log(`Stored Valid Squares: ${storedValidSquare}`);
        //move chess piece on DOM event target and engine;
        if (e.target.innerText === storedValidSquare) {
          currentMoveObj = chessGame.move({
            to: e.target.innerText,
            from: storedCurrentMoveSquare,
          });
          console.log(`Chess move: to:${currentMoveObj.to} from:${currentMoveObj.from}`);
          
          if (localStorage.getItem("captured")) {
            localStorage.removeItem("captured");
            if (e.target.classList.hasAttribute("captured")) {
              e.target.classList.removeAttribute("captured");
            }
          }

          if (localStorage.getItem("promotion")) {
            currentMoveObj = chessGame.move({
              to: e.target.innerText,
              from: storedCurrentMoveSquare,
              promotion: "q",
            });
            if (e.target.classList.hasAttribute("promotion")) {
              e.target.classList.removeAttribute("promotion");
            }
            localStorage.removeItem("promotion");
          }
          chessGame.remove(storedCurrentMoveSquare);
          localStorage.removeItem(storedCurrentMoveSquare);
        }
      }
      populateLocalStoragePieces(allSquares);
      updateDomId(allSquares);

      /**  if (
        localStorage.getItem("playerTurn") === "w" &&
        currentMoveObj.promotion
      ) {
        let whiteQueenPromo = currentMoveObj.promotion.toUpperCase();
        e.target.classList.replace(currentMoveObj.promotion, whiteQueenPromo);
      }*/
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
        console.log("Insufficient material.");
      }
      if (gameOver) {
        console.log("Game has ended. White loses.");
      }
    }
  }
}

myChessFile();
