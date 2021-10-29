document.addEventListener("readystatechange", () => {
    if (document.readyState == "loading") {
    return console.log("DOM loading not complete.");
    } else {
      console.log("Glossary.js readyState:", document.readyState);
     const piece = {
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
     const boardSq = 120;
     const file = {
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
     const rank = {
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
     const colours = { white: 0, black: 1, both: 2 };
     const squares = {
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

      const bool = { false: 0, true: 1 };
      const fileBoard = new Array(boardSq); //file array;
      const rankBoard = new Array(boardSq); //rank array;

      
      
      
    return;
  }
  
});
