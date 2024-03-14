import Image from "next/image";
import { DragPreviewImage, useDrag } from "react-dnd";
import { ItemTypes } from "./Board";

export default function Knight() {
  const [{isDragging}, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div className="w-[100%] h-[100%] flex items-center justify-center relative">
      {
        isDragging ? (
          <div ref={dragPreview}></div>
        ) 
        : (
          <Image
            ref={drag}
            className="w-full h-full absolute opacity-100"
            style={{ zIndex: 100 }}
            src="https://images.chesscomfiles.com/chess-themes/pieces/wood/150/bn.png"
            alt="BN"
            width={150}
            height={150}
            priority
          />
        )
      }
    </div>
  )
}
