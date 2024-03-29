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
import { map, filter } from "lodash";
import PlayerInfoSection from "../../components/PlayerInfoSection";
import { useAuthContext } from "@/app/context/authContext";

export default function ChessGame({ params }: { params: { game_id: string } }) {
  const router = useRouter();
  const { authState } = useAuthContext();

  const [gameData, setGameData] = React.useState<Object>({});
  const [chess, _setChess] = React.useState(new Chess("r2q1rk1/1ppb1ppp/1bn1pn2/3p4/1PPP4/3BPN1P/3BNPP1/R2Q1RK1 b - - 0 13"));
  const [board, setBoard] = React.useState(chess.board());
  const [flipBoard, setFlipBoard] = React.useState(false);
  const [whitePiecesPlayer, setWhitePiecesPlayer] = React.useState(null);
  const [blackPiecesPlayer, setBlackPiecesPlayer] = React.useState(null);
  const [currentPlayer, setCurrentPlayer] = React.useState(null);

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
      const game = response.data
      setGameData(response.data);
    } else {
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

  React.useEffect(() => {
    const gamePlayers = gameData.players;
    const currentUser = authState.user;
    
    const whitePlayer = filter(gamePlayers, (player) => player.identifier === "white" )[0];
    const blackPlayer = filter(gamePlayers, (player) => player.identifier === "black" )[0];
    const currentPlayer = filter(gamePlayers, (player) => player.id === currentUser?.id)[0];

    setWhitePiecesPlayer(whitePlayer);
    setBlackPiecesPlayer(blackPlayer);
    setCurrentPlayer(currentPlayer);
  }, [gameData]);

  const topDisplayedPlayer = React.useMemo(() => {
    if (flipBoard) {
      return whitePiecesPlayer || (currentPlayer ? {name: "Opponent"} : {name: "Player 2"})
    } else {
      return blackPiecesPlayer || (currentPlayer ? {name: "Opponent"} : {name: "Player 2"})
    }
  }, [blackPiecesPlayer, currentPlayer, flipBoard, whitePiecesPlayer]);

  const bottomDisplayedPlayer = React.useMemo(() => {
    if (flipBoard) {
      return blackPiecesPlayer || (currentPlayer ? {name: "Opponent"} : {name: "Player 1"})
    } else {
      return whitePiecesPlayer || (currentPlayer ? {name: "Opponent"} : {name: "Player 1"})
    }
  }, [blackPiecesPlayer, currentPlayer, flipBoard, whitePiecesPlayer]);

  React.useEffect(() => {
    const currentUser = authState.user;

    if (currentUser && blackPiecesPlayer && currentUser.id === blackPiecesPlayer.id) {
      setFlipBoard(true);
    }
  }, [authState.user, blackPiecesPlayer]);

  return (
    <GamePageLayout
      gamePlaySection={
        <div className="h-full aspect-square text-white">
          <PlayerInfoSection player={topDisplayedPlayer} />
          <div style={{height: "calc(100% -  120px)"}} className="py-2">
            <ChessBoard board={board} movePiece={movePiece} canPlay={true} flipBoard={flipBoard} />
          </div>
          <PlayerInfoSection player={bottomDisplayedPlayer} />
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
