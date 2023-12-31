import { BoardBeforeReady } from "./BoardBeforeReady";
import { BoardAfterReady } from "./BoardAfterReady";
import { useState } from "react";

type Piece = {
  owner: string;
  type: string;
  position: number[];
};

type Block = {
  address: number[];
  piece: Piece | undefined;
};

type Player = {
  name: string;
  pieces: {
    [key: string]: Piece;
  };
  pickedBluePiecesCount: number;
  pickedRedPiecesCount: number;
};

type Table = {
  players: Player[];
  winner: string;
  table: Block[][];
  turn: number;
  gameId: number | null;
};

type BoardProps = {
  initialData: Table;
  playMode: string;
};

export const Board = ({ initialData, playMode }: BoardProps) => {
  const [isGameReady, setIsGameReady] = useState(false);
  return (
    <div>
      {isGameReady ? (
        <BoardAfterReady initialData={initialData} playMode={playMode} />
      ) : (
        <BoardBeforeReady
          initialData={initialData}
          playMode={playMode}
          onGameReady={() => setIsGameReady(true)}
        />
      )}
    </div>
  );
};
