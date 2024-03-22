'use client';

import React from "react";
import { Chess, SQUARES } from 'chess.js';
import ChessBoard from "../components/Board";
import GamePageLayout from "@/app/ui/layouts/gamePageLayout";
import CreateGame from "../components/CreateGame";

export default function ChessPlay({ params }: { params: { game_id: string } }) {

  const [chess, _setChess] = React.useState(new Chess());
  const [board, _setBoard] = React.useState(chess.board());

  return (
    <GamePageLayout
      gamePlaySection={
        <ChessBoard board={board} movePiece={(_move) => { return false }} canPlay={false} />
      }
      gameOptionsSection={
        <CreateGame />
      }
    >
    </GamePageLayout>
  );
}
