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
      id={name}
      className={clsx(
        "w-[12.5%] aspect-square flex items-center justify-center cursor-pointer relative",
        {
          "bg-[#E9E9DF]": type === "light",
          "bg-[#BB9979]": type === "dark",
          // "rounded-tl-md": name === "a8",
          // "rounded-tr-md": name === "h8",
          // "rounded-bl-md": name === "a1",
          // "rounded-br-md": name === "h1",
        }
      )}
      >
      {children}
      {/* <div className="absolute bottom-0 right-0 text-gray-900">
        {name}
      </div> */}
    </div>
  );
}
