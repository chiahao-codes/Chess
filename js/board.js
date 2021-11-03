//Game board set up, with rules defined for the game;

var gameBoard = {};
gameBoard.pieces = new Array(boardSq); //represents all 120 squares on our board; we can know if there is a piece on the square;
gameBoard.sideToMove = colours.white;
gameBoard.fiftyMove = 0;
//accommodate "fifty-move rule" in chess; if both players have made fifty moves each and
//no piece has been taken and pawns have not moved, then it is a draw. 
//gameBoard.fiftyMove increments each time a player moves, up to 100;
//resets to zero when a pawn moves or a piece gets captured;

gameBoard.hisPlay = 0;
//keeps track of every move made in the game;
//a half-move is when only 1 player makes a move;
//a full-move is when both players have made moves;

gameBoard.play = 0;
//tracks the number of half-moves in the "search-tree"; 
//an algorithm explores several half-moves along the search-tree;
//it explores the optimal outcome by testing out half-moves;

gameBoard.castlePerm = 0
//tracks the Castle permission move in chess; use values assigned to castleBit object;
//use binary digits' sum to represent which side has permission to move;
/**
 * King can move to either side 2 squares and Rook moves towards King 2 squares; They switch ends;
 * if Rook has not moved and King has not moved;
 * Binary tracker ex.
 *a. 0001 in binary is 1, which means white-King has permission to move on white-King's side towards rook;
 *b. 0010 in binary is 2, which gives white-King permission to move on white-Queen's side towards rook;
 *c. 0100 in binary is 4, which gives black-King permission to move on black-King's side;
 *d. 1000 in binary is 8, which gives black-King permission to move on black-Queen's side;
 * 
 * 1101 = 13 = a + c + d; which means only those 3 moves are allowed;
 */
gameBoard.material = new Array(2); //track "material" of pieces (i.e. black vs. white); not sure what video means to do with this;
gameBoard.pieceNumb = new Array(13);//corresponds to chessPieces property values in glossary.js; tells us how many chess pieces of each type exist;