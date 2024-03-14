'use client';

import React from "react";
import { Chess, SQUARES } from 'chess.js'
import ChessBoard from "./components/Board";

export default function ChessApp() {
  const [chess, _setChess] = React.useState(new Chess());
  const [board, setBoard] = React.useState(chess.board())

  const movePiece = React.useCallback((move: Object | string) => {
    console.log("move");
    try {
      // Attempt the move with potential flexibility
      const success = chess.move(move);
      setBoard(chess.board());
      return true;
    } catch (error) {
      return false;
    }
  }, [chess]);

  return (
    <ChessBoard board={board} movePiece={movePiece} />
  );
}
