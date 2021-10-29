initFileRankBrd();

//function creates for-loops in order to populate each chess board (Number Board, Rank, File)
//with their proper values;
function initFileRankBrd() {
  var index;
  var file = files.fileA;
  var rank = ranks.rank1;
  var squ = squares.a1;

  //set each square on the Chess Board to 100 aka..offboard;
  for (index = 0; index < boardSq; ++index) {
    fileBoard[index] = squares.offboard;
    rankBoard[index] = squares.offboard;
    }
    
    //now...populate the File and Rank Boards with the number according to Number Board;
    //chess board visualizations are saved in my google sheets;
  for (rank; rank <= ranks.rank8; ++rank) {
    for (file; file <= files.fileH; ++file) {
      squ = fileRankSqu(file, rank);
      fileBoard[squ] = file;
      rankBoard[squ] = rank;
    }
  }

  console.log(`fileBoard[0]: ${fileBoard[0]}, rankBoard[0]:${rankBoard[0]}`);
  console.log(
    `fileBoard[squares.a1]: ${fileBoard[squares.a1]}, rankBoard[squares.a1]: ${rankBoard[squares.a1]}`
  );
  console.log(
    `fileBoard[square.e8]: ${fileBoard[squares.e8]}, rankBoard[square.e8]: ${
      rankBoard[squares.e8]
    }`
    );
}

   
