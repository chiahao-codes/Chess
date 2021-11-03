  var chessPieces = {
    empty: 0,
    wPwn: 1,
    wNight: 2,
    wBshp: 3,
    wRook: 4,
    wQueen: 5,
    wKing: 6,
    bPwn: 7,
    bNight: 8,
    bBshp: 9,
    bRook: 10,
    bQueen: 11,
    bKing: 12,
  };
  var boardSq = 120;
  var files = {
    fileA: 0,
    fileB: 1,
    fileC: 2,
    fileD: 3,
    fileE: 4,
    fileF: 5,
    fileG: 6,
    fileH: 7,
    fileNone: 8,
  };
  var ranks = {
    rank1: 0,
    rank2: 1,
    rank3: 2,
    rank4: 3,
    rank5: 4,
    rank6: 5,
    rank7: 6,
    rank8: 7,
    rankNone: 8,
  };
  var colours = { white: 0, black: 1, both: 2 };
var castleBit = { wKingSide: 1, wQueenSide: 2, bKingSide: 4, bQueenSide: 8 };

  //squares numbered as per Number Board in google sheets;
  //these values represent the rank/file number at each square on the chess board;
  //extra rank/file rows are used to reflect off-board areas;
  var squares = {
    a1: 21,
    b1: 22,
    c1: 23,
    d1: 24,
    e1: 25,
    f1: 26,
    g1: 27,
    h1: 28,
    a8: 91,
    b8: 92,
    c8: 93,
    d8: 94,
    e8: 95,
    f8: 96,
    g8: 97,
    h8: 98,
    no_squ: 99,
    offboard: 100,
  }; //squares represent key positions on the chess board (i.e. white/black home file and rank);

  var bool = { false: 0, true: 1 };
  var fileBoard = new Array(boardSq); //file array;
  var rankBoard = new Array(boardSq); //rank array;

  //converts the file/rank position into the Numbered position on the chess board;
  function fileRankSqu(f, r) {
    return 21 + f + r * 10;
};

/**more definitions to help with evaluating pieces when generating moves; not sure how to use them yet */
//big piece = non-pawn;
var pieceBig = [
  bool.false,
  bool.false,
  bool.true,
  bool.true,
  bool.true,
  bool.true,
  bool.true,
  bool.false,
  bool.true,
  bool.true,
  bool.true,
  bool.true,
  bool.true,
];
//Major piece == Queen or Rook;
var pieceMajor = [
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.true,
  bool.true,
  bool.true,
  bool.false,
  bool.false,
  bool.false,
  bool.true,
  bool.true,
  bool.true,
];
//Minor piece == Bishop or Knight;
var pieceMinor = [
  bool.false,
  bool.false,
  bool.true,
  bool.true,
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.true,
  bool.true,
  bool.false,
  bool.false,
  bool.false,
];
var pieceVal = [
  0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 550, 1000, 50000,
];
//what color the piece is -- corresponds to chessPiece array index;
var pieceColour = [
  colours.both,
  colours.white,
  colours.white,
  colours.white,
  colours.white,
  colours.white,
  colours.white,
  colours.black,
  colours.black,
  colours.black,
  colours.black,
  colours.black,
  colours.black,
];

var piecePawn = [
  bool.false,
  bool.true,
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.true,
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.false,
];
var pieceKnight = [
  bool.false,
  bool.false,
  bool.true,
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.true,
  bool.false,
  bool.false,
  bool.false,
  bool.false,
];
var pieceKing = [
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.true,
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.true,
];
var pieceRookQueen = [
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.true,
  bool.true,
  bool.false,
  bool.false,
  bool.false,
  bool.false,
  bool.true,
  bool.true,
  bool.false,
];
var pieceBishopQueen = [
  bool.false,
  bool.false,
  bool.false,
  bool.true,
  bool.false,
  bool.true,
  bool.false,
  bool.false,
  bool.false,
  bool.true,
  bool.false,
  bool.true,
  bool.false,
];
//does the piece "slide"? whatever that means;
var pieceSlides = [
  bool.false,
  bool.false,
  bool.false,
  bool.true,
  bool.true,
  bool.true,
  bool.false,
  bool.false,
  bool.false,
  bool.true,
  bool.true,
  bool.true,
  bool.false,
];




