import clsx from "clsx";
import { useDrop } from "react-dnd";
import React from "react";

type SquareProps = {
  name: string,
  type: string,
  onPieceDrop: (from: string, to: string) => boolean,
  children?: React.ReactNode
};

export default function Square({ name, type, children, onPieceDrop }: SquareProps) {
  const [{ isOver, item }, drop] = useDrop(() => ({
    accept: "ChessPiece",
    drop: (item) => {
      onPieceDrop(item.currentPosition, name);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem()
    })
  }), [name])

  return (
    <div 
      ref={drop}
      className={clsx(
        "w-[12.5%] aspect-square flex items-center justify-center cursor-pointer",
        {
          "bg-[#EBECD0]": type === "light",
          "bg-[#739552]": type === "dark"
        }
      )}
      >
      {children}
    </div>
  );
}
