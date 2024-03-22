'use client'
import React from "react";
import clsx from 'clsx';
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import GameService from "@/app/services/gameService";
import { useRouter } from "next/navigation";


const timeControlOptions = [
  {name: "3 min", key: "3min", value: "180"},
  {name: "3+2 min", key: "3|2min", value: "180+2"},
  {name: "5 min", key: "5min", value: "300"},
  {name: "10 min", key: "10min", value: "600"},
  {name: "15+10 min", key: "15|10min", value: "900+10"},
  {name: "30 min", key: "30min", value: "1800"}
];

const playAsOptions = [
  {name: "white", image: "https://images.chesscomfiles.com/chess-themes/pieces/wood/150/wk.png", bgColor: "#f2f2f2"},
  {name: "black", image: "https://images.chesscomfiles.com/chess-themes/pieces/wood/150/bk.png", bgColor: "grey"}
];

export default function CreateGame() {
  const [timeControl, selectTimeControl] = React.useState(timeControlOptions[0]);
  const [playAs, setPlayAs] = React.useState<string>("white");
  const router = useRouter();
  
  const createNewGame = React.useCallback(async () => {
    const gameService = new GameService();

    const params = {
      type: "chess",
      status: "created",
      min_players: 2,
      max_palyers: 2,
      created_by: "6016d4fd-81bb-4ce0-a205-9c98ae668532",
      game_time_control_setting: {
        enable_per_player_timer: true,
        per_player_time_seconds: timeControl.value
      },
      playAs
    };

    const response = await gameService.createGame(params)

    if (response.success) {
      const game_id = response.data.id;

      router.push(`/chess/play/${game_id}`);
    } else {
      console.log("error while creating");
    }
  }, [playAs, router, timeControl.value]);

  return (
    <div className="relative h-full">
      <h4 className="pb-4 text-sm font-semibold">
        Time control
      </h4>
      <div className="flex flex-wrap justify-between">
        {
          timeControlOptions.map((option) => {
            return (
              <button
                key={option.key}
                type="button"
                className={clsx(
                  "rounded-md bg-white/10 mb-2.5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 border border-[2px] border-transparent",
                  {
                    "border-[#A2D05F]": option.key === timeControl.key
                  })
                }
                style={{
                  width: "48%"
                }}
                onClick={() => {
                  selectTimeControl(option)
                }}
              >
                {option.name}
              </button>
            );
          })
        }
      </div>
      <h4 className="mt-6 pb-4 text-sm font-semibold">
        Play as
      </h4>
      <div className="flex flex-wrap justify-between">
        {
          playAsOptions.map((option) => {
            return (
              <button
                key={option.name}
                type="button"
                className={clsx(
                  "flex justify-center rounded-md bg-white/10 mb-2.5 px-3.5 py-1 font-semibold text-white shadow-sm hover:bg-white/20 border border-[3px] border-transparent",
                  {
                    "border-[#A2D05F]": option.name === playAs
                  })
                }
                style={{
                  width: "48%",
                  backgroundColor: option.bgColor
                }}
                onClick={() => {
                  setPlayAs(option.name)
                }}
              >
                <Image
                  className="w-15 h-15"
                  src={option.image}
                  alt="option.name"
                  width={60}
                  height={60}             
                />
              </button>
            );
          })
        }
      </div>

      <button
        type="button"
        className="rounded-md w-full bg-[#81B64B] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#A2D05F] absolute bottom-0"
        onClick={createNewGame}
      >
        Create Game
      </button>
    </div>
  );
}