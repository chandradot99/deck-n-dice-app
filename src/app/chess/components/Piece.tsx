import Image from "next/image";
import { ChessPieceType } from "../types/chess-piece";
import { useDrag } from "react-dnd";
import clsx from "clsx";

type ChessPieceProps = {
  piece: ChessPieceType | null;
};

export default function ChessPiece({ piece }: ChessPieceProps) {
  const [{isDragging}, drag, dragPreview] = useDrag(() => ({
    type: "ChessPiece",
    item: piece,
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
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
            src={`https://images.chesscomfiles.com/chess-themes/pieces/wood/150/${piece.name}.png`}
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
