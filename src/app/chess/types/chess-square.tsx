import { ChessPieceType } from "./chess-piece";

export type ChessSquare = {
  color: string;
  piece: ChessPieceType | null;
  squareName: string;
  squareNumber?: number;
};
