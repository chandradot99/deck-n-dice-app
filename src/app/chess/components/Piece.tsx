import Image from "next/image";
import { ChessPieceType, pieceMap } from "../types/chess-piece";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./Board";
import clsx from "clsx";

export default function ChessPiece({ piece }: { piece: ChessPieceType | null }) {
  const [{isDragging}, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [piece])


  if (!piece) {
    return null;
  }

  return (
    <div className="w-[100%] h-[100%] flex items-center justify-center relative">
      {
        isDragging ? (
          <div className="cursor-pointer" ref={dragPreview}></div>
        ) : (
          <Image
            ref={drag}
            className={clsx(
              "w-full h-full absolute cursor-pointer",
              {
                "opacity-0": isDragging
              }
            )}
            style={{ zIndex: 100 }}
            src={`https://images.chesscomfiles.com/chess-themes/pieces/wood/150/${pieceMap[piece?.identifier]}.png`}
            alt="Piece"
            width={150}
            height={150}
            priority
          />
        )
      }
    </div>
  )
}
