import { BoardBeforeReady } from "./BoardBeforeReady";
import { BoardAfterReady } from "./BoardAfterReady";
import { useState } from "react";

type Piece = {
  owner: string;
  type: string;
  position: number[] | undefined;
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
  const [BoardState, setBoardState] = useState<Table>(initialData);

  const handleSetGameReady = () => {
    setIsGameReady(true);
    // リクエストを送る
    // setBoardState(res)
    console.log("setIsGameReady(true);");
  };

  return (
    <div>
      {isGameReady ? (
        <BoardAfterReady initialData={BoardState} playMode={playMode} />
      ) : (
        <BoardBeforeReady
          initialData={BoardState}
          playMode={playMode}
          onGameReady={handleSetGameReady}
        />
      )}
    </div>
  );
};
