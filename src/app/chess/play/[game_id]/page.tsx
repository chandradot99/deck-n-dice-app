'use client';

import React from "react";
import { Chess, SQUARES } from 'chess.js';
import {Howl, Howler} from 'howler';
import { Socket } from "phoenix-socket";
import ChessBoard from "../../components/Board";

export default function ChessGame({ params }: { params: { game_id: string } }) {

  const [chess, _setChess] = React.useState(new Chess());
  const [board, setBoard] = React.useState(chess.board());

  const movePiece = React.useCallback((move: Object | string) => {
    try {
      // Attempt the move with potential flexibility
      const success = chess.move(move);
      setBoard(chess.board());

      var sound = new Howl({
        src: ["https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3"]
      });

      sound.play();

      return true;
    } catch (error) {
      return false;
    }
  }, [chess]);

  React.useEffect(() => {
    let socket = new Socket("ws://localhost:4000/socket", {});
    socket.connect();

    let channel = socket.channel("chess_lobby:lobby", {});

    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })
  });

  return (
    <main className="flex w-screen h-screen flex-col items-center justify-between p-24">
      <ChessBoard board={board} movePiece={movePiece} canPlay={true} />
    </main>
  );
}
