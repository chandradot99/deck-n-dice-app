'use client'

import React from "react";
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Square from "./square";
import { ChessSquare } from "../types/chess-square";
import { ChessPieceType } from "../types/chess-piece";
import ChessPiece from "./Piece";
import { reverse, map } from "lodash";

type ChessBoardProps = {
  board: ({ square: string; type: string; color: string; } | null)[][];
  movePiece: (move: Object | string) => boolean;
  canPlay: boolean;
  flipBoard?: boolean;
};

export default function ChessBoard({ board, movePiece, canPlay, flipBoard = false }: ChessBoardProps) {
  const [squares, setSquares] = React.useState<ChessSquare[]>([]);
  const [blackMove, setBlackMove] = React.useState<string>("");

  const setupBoard = React.useCallback(() => {
    const chessSquares: ChessSquare[] = [];
    const ranks = flipBoard ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1];
    const files = flipBoard ? ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'] : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    // Create squares with initial state
    ranks.forEach((rank, index) => {
      const rankPiecesPosition =  flipBoard ? board[7 - index] : board[index];

      files.forEach((file, index) => {
        const squareName = file + rank;
        const type = ((rank + file.charCodeAt(0)) % 2 === 0) ? "light" : "dark";
        let piece: ChessPieceType | null = null;

        const piecePosition = flipBoard ? rankPiecesPosition[7 - index] : rankPiecesPosition[index];

        if(piecePosition) {
          piece = {
            name: `${piecePosition['color']}${piecePosition['type']}`,
            currentPosition: piecePosition['square']
          }
        }

        const square: ChessSquare = {
          color: type,
          squareName,
          piece
        }

        chessSquares.push(square)
      })
    })

    setSquares(chessSquares);
  }, [board, flipBoard]);

  React.useEffect(() => {
    setupBoard();
  }, [setupBoard]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full aspect-square rounded-lg flex flex-wrap">
        {
          squares.map(({ squareName, color, piece }) => {
            const key = `${squareName}${piece?.name || ""}`;

            return (
              <Square key={key} onPieceDrop={(from, to) => movePiece({ from, to })}  name={squareName} type={color}>
                <ChessPiece piece={piece} canPlay={canPlay} />
              </Square>
            );
          })
        }
      </div>
    </DndProvider>
  );
}
