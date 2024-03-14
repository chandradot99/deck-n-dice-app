export const pieceMap = {
  'r': "br",
  'n': "bn",
  'b': "bb",
  'q': "bq",
  'k': "bk",
  'p': "bp",
  'R': "wr",
  'N': "wn",
  'B': "wb",
  'Q': "wq",
  'K': "wk",
  'P': "wp"
};


export type ChessPieceType = {
  name: string;
  identifier: string; // use small letters for dark pieces and capital letters for light pieces
};
