document.addEventListener("readystatechange", () => {
  console.log("DOM is loaded. Glossary.js is loaded!");
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
});
