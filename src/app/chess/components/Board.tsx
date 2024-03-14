'use client'

import React from "react";
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Knight from "./knight";
import Square from "./square";
import { ChessSquare } from "../types/chess-square";
import { ChessPieceType, pieceMap } from "../types/chess-piece";
import ChessPiece from "./Piece";

export default function ChessBoard() {
  const [knightPosition, setKnightPosition] = React.useState<string>("f7");
  const [squares, setSquares] = React.useState<ChessSquare[]>([]);

  const getRankPiecesArray = React.useCallback((fenString: string) => {
    const pieces: string[] = [];

    for (const c of fenString) {
      if (c.charCodeAt(0) >= 49 && c.charCodeAt(0) <= 56) {
        const length = parseInt(c);
        Array.from({ length }, (x, i) => {
          pieces.push("");
        });
      } else {
        pieces.push(c);
      }
    }

    return pieces;
  }, [])

  const setupBoard = React.useCallback(() => {
    const initialBoardFenString = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0";
    const piecesFenString = initialBoardFenString.split(" ")[0];
    const ranksFenStringArray = piecesFenString.split("/");
    const chessSquares: ChessSquare[] = [];
    const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    // Create squares with initial empty state
    ranks.forEach((rank, index) => {
      const currentRankFenString = ranksFenStringArray[8 - rank];
      const rankPiecesArray = getRankPiecesArray(currentRankFenString);

      files.forEach((file, index) => {
        const squareName = file + rank;
        const type = ((rank + file.charCodeAt(0)) % 2 === 0) ? "light" : "dark";
        let piece: ChessPieceType | null = null;

        if(rankPiecesArray[index]) {
          const identifier = rankPiecesArray[index]

          piece = {
            name: pieceMap[identifier],
            identifier
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
  }, []);

  const canKnightMove = React.useCallback((newPosition: string, currentPosition: string) => {
     // Convert positions to integer coordinates (rank, file)
    const currentRank = parseInt(currentPosition[1]) - 1;
    const currentFile = currentPosition[0].charCodeAt(0) - 97;
    const newRank = parseInt(newPosition[1]) - 1;
    const newFile = newPosition[0].charCodeAt(0) - 97;

    // Calculate the difference in rank and file
    const rankDiff = Math.abs(currentRank - newRank);
    const fileDiff = Math.abs(currentFile - newFile);

    // Valid knight moves are either two ranks and one file or one rank and two files
    return (rankDiff === 2 && fileDiff === 1) || (rankDiff === 1 && fileDiff === 2);
  }, []);

  const moveKnight = React.useCallback((position: string) => {
    setKnightPosition((prevPosition) => {
      if (canKnightMove(position, prevPosition)) {
        return position;
      }
      return prevPosition;
    });
  }, [canKnightMove]);


  React.useEffect(() => {
    setupBoard();
  }, [setupBoard]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-wrap h-full aspect-square">
        {
          squares.map(({ squareName, color, piece }) => {
            return (
              <Square key={squareName} onPieceDrop={(name) => moveKnight(name)}  name={squareName} type={color}>
                <ChessPiece piece={piece} />
                {/* {
                  squareName === knightPosition && <Knight />
                } */}
              </Square>
            );
          })
        }
      </div>
    </DndProvider>
  );
}

export const ItemTypes = {
  KNIGHT: 'knight'
}
