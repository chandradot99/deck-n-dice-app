import clsx from "clsx";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./Board";
import React from "react";

type SquareProps = {
  name: string,
  type: string,
  onPieceDrop: (name: string) => void,
  children?: React.ReactNode
};

export default function Square({ name, type, children, onPieceDrop }: SquareProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.KNIGHT,
    drop: () => onPieceDrop(name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
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
