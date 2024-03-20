'use client';

import React from "react";
import { Chess, SQUARES } from 'chess.js';
import ChessBoard from "../components/Board";

export default function ChessPlay({ params }: { params: { game_id: string } }) {

  const [chess, _setChess] = React.useState(new Chess());
  const [board, _setBoard] = React.useState(chess.board());

  return (
    <main className="flex w-screen h-screen flex-col items-center justify-between p-24">
      <ChessBoard board={board} movePiece={(_move) => { return false }} canPlay={false} />
    </main>
  );
}
