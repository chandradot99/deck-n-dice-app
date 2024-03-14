import ChessBoard from "./components/Board";
import Knight from "./components/knight";
import Square from "./components/square";

export default function ChessPage() {
  return (
    <main className="flex w-screen h-screen flex-col items-center justify-between p-24">
      <ChessBoard />
    </main>
  );
}
