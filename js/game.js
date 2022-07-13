function myChessFile() {
  const { Chess } = require("chess.js");
  const chessGame = new Chess();

  window.addEventListener("load", () => {
    //loads local storage...
    console.log(" Sup...");
  });

  let allSquares = document.querySelectorAll(".rankFile > div");
  let moves,
    storedValidMoves,
    storedCurrentMoveSquare, gameStatus,
    turn = chessGame.turn();
    localStorage.setItem("playerTurn", turn);
    

    //populate localStorage via getSquare();
    //update the DOM via localStorage;
    populateLocalStoragePieces(allSquares); 
  
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

  function updateDomId(allsquares) {
    //add id to DOM element based on local storage;
    for (let i = 0; i < allsquares.length; i++) {
      let domSquare = allsquares[i].innerText,
        domElement = allsquares[i];
      let storagePieceValue = localStorage.getItem(domSquare);

      if (localStorage.getItem("currentMove")) {
        let currentMoveSquare = localStorage.getItem("currentMove").slice(0, 2);
        if (currentMoveSquare === domSquare) {
          domElement.classList.add("currentMove");
        }
      }

      if (localStorage.getItem("validMoves")) {
        let validMovesInLocalStorage = localStorage.getItem("validMoves");
        for (let i = 1; i < validMovesInLocalStorage.length; i += 2) {
          let validMoveSquare = validMovesInLocalStorage[i - 1] + validMovesInLocalStorage[i];
          if (validMoveSquare === domSquare) {
            domElement.classList.add("validMove");
          }
        }
        domElement.addEventListener("click", makeMoves);
      }
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
    for (let squares of allsquares) {
      squares.addEventListener("click", getValidMoves);
    }
    gameStatus = localStorage.getItem("gameStatus");
    if (gameStatus) {
      updateDomId(allsquares);
    } else {
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
      updateDomId(allsquares);
    }    
  }


  function getValidMoves(e) {
    localStorage.setItem("gameStatus", "inProgress");
    //add currentMove class to square being clicked;
    const myTarget = e.target;
    const squareInnertext = myTarget.innerText;
    let squares;
    removeValidAndCurrentMoves(allSquares);

    moves = chessGame.moves({ square: squareInnertext, verbose: true }); //array;

    if ( moves.length > 0 && moves[0].color === localStorage.getItem("playerTurn")) {
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
        for (squares of allSquares) {
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

  function makeMoves(e) {
   
    let currentMoveObj,storedValidSquare;
    
    storedCurrentMoveSquare = storedCurrentMoveSquare.slice(0, 2);
    
    
    if (storedValidMoves) {
      for (let i = 1; i < storedValidMoves.length; i += 2) {
        storedValidSquare = storedValidMoves[i - 1] + storedValidMoves[i];
        
        //move chess piece on DOM event target and engine;
        if (e.target.innerText === storedValidSquare) {
            currentMoveObj = chessGame.move({
            to: e.target.innerText,
            from: storedCurrentMoveSquare,
          });
          console.log(`Chess move: to:${currentMoveObj.to} from:${currentMoveObj.from}`);
          
          if (localStorage.getItem("captured")) {
            localStorage.removeItem("captured");
            localStorage.removeItem(storedValidSquare);
            if (e.target.hasAttribute("captured")) {
              e.target.removeAttribute("captured");
            }
             console.log(
               `Chess move: to:${currentMoveObj.to} from:${currentMoveObj.from} captured:${currentMoveObj.captured}`
             );
          }

          if (localStorage.getItem("promotion")) {
            currentMoveObj = chessGame.move({
              to: e.target.innerText,
              from: storedCurrentMoveSquare,
              promotion: "q",
            });

            if (localStorage.getItem("playerTurn") === "w") {
              currentMoveObj = currentMoveObj.promotion.toUpperCase();
            }

            let setPromoPieceColor = currentMoveObj.promotion + currentMoveObj.color;
            localStorage.setItem(storedValidSquare, setPromoPieceColor);

            if (e.target.hasAttribute("promotion")) {
              e.target.removeAttribute("promotion");
            }
             console.log(
               `Chess move: to:${currentMoveObj.to} from:${currentMoveObj.from} promotion:${currentMoveObj.promotion}`
             );
            localStorage.removeItem("promotion");
          }
          chessGame.remove(storedCurrentMoveSquare);
          localStorage.removeItem(storedCurrentMoveSquare);
        }
      }
      populateLocalStoragePieces(allSquares); 
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
