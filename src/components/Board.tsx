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
  gameId: string;
};

type BoardProps = {
  initialData: Table;
};

export const Board = ({ initialData }: BoardProps) => {
  const [isGameReady, setIsGameReady] = useState(false);
  const [BoardState, setBoardState] = useState<Table>(initialData);

  const handleSetGameReady = async () => {
    setIsGameReady(true);
    // リクエストを送る
  };

  return (
    <div>
      {isGameReady ? (
        <BoardAfterReady initialData={BoardState} />
      ) : (
        <BoardBeforeReady
          initialData={BoardState}
          onGameReady={handleSetGameReady}
        />
      )}
    </div>
  );
};
