'use client';

import React from "react";
import { Chess, SQUARES } from 'chess.js';
import {Howl, Howler} from 'howler';
import { Socket } from "phoenix-socket";
import ChessBoard from "../../components/Board";
import GamePageLayout from "@/app/ui/layouts/gamePageLayout";
import Image from "next/image";
import GameService from "@/app/services/gameService";
import { useRouter } from "next/navigation";

export default function ChessGame({ params }: { params: { game_id: string } }) {
  const router = useRouter();

  const [gameData, setGameData] = React.useState<Object>({});
  const [chess, _setChess] = React.useState(new Chess("r2q1rk1/1ppb1ppp/1bn1pn2/3p4/1PPP4/3BPN1P/3BNPP1/R2Q1RK1 b - - 0 13"));
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

  const fetchGameDetails = React.useCallback(async () => {
    const gameService = new GameService();
    const response = await gameService.fetchGame(params.game_id);

    if (response.success) {
      console.log("player", response.data);
      setGameData(response.data);
    } else {
      console.log("player", response.data);
      router.push(`/chess/play`);
    }

  }, [params.game_id, router]);

  React.useEffect(() => {
    fetchGameDetails();

    // let socket = new Socket("ws://localhost:4000/socket", {});
    // socket.connect();

    // let channel = socket.channel("chess_lobby:lobby", {});

    // channel.join()
    //   .receive("ok", resp => { console.log("Joined successfully", resp) })
    //   .receive("error", resp => { console.log("Unable to join", resp) })
  }, [fetchGameDetails]);

  return (
    <GamePageLayout
      gamePlaySection={
        <div className="h-full aspect-square text-white">
          <div className="h-[60px] flex items-center">
            <Image
              className="inline-block h-12 w-12 rounded-md"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
              width={100}
              height={100}
            />
            <span className="pl-2">Chandra</span>
          </div>
          <div style={{height: "calc(100% -  120px)"}} className="py-2">
            <ChessBoard board={board} movePiece={movePiece} canPlay={true} flipBoard={true} />
          </div>
          <div className="h-[60px] flex items-center">
            <Image
              className="inline-block h-12 w-12 rounded-md"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
              width={100}
              height={100}
            />
            <span className="pl-2">Bandana</span>
          </div>
        </div>
      }
      gameOptionsSection={
        <div>
          Side Options
        </div>
      }
      >
    </GamePageLayout>
  );
}
