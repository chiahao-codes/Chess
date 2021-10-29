initFileRankBrd();

function initFileRankBrd() {
  var index;
  var file = files.fileA;
  var rank = ranks.rank1;
  var squ = squares.a1;

  //set each square in the File Board and Rank Board to 100 aka..offboard;
  //google sheets contains illustrations for File/Rank Board;
  for (index = 0; index < boardSq; ++index) {
    fileBoard[index] = squares.offboard;
    rankBoard[index] = squares.offboard;
  }

  for (rank; rank <= ranks.rank8; ++rank) {
    for (file; file <= files.fileH; ++file) {
      squ = fileRankSqu(file, rank);
      fileBoard[squ] = file;
      rankBoard[squ] = rank;
    }
  }

  console.log(`fileBoard[0]: ${fileBoard[0]}, rankBoard[0]:${rankBoard[0]}`);
  console.log(
    `fileBoard[squ]: ${fileBoard[squ]}, rankBoard[square.a1]: ${rankBoard[squ]}`
  );
  console.log(
    `fileBoard[square.e8]: ${fileBoard[squares.e8]}, rankBoard[square.e8]: ${
      rankBoard[squares.e8]
    }`
    );
}

   
