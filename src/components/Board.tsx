import { BoardBeforeReady } from "./BoardBeforeReady";
import { BoardAfterReady } from "./BoardAfterReady";
import { useState } from "react";
import { requestNotifyGamePreparationComplete } from "../rpcService/requestNotifyGamePreparationComplete";

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
  playerUuid: string;
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
  tableUuid: string;
};

type BoardProps = {
  initialData: Table;
};

export const Board = ({ initialData }: BoardProps) => {
  const [isGameReady, setIsGameReady] = useState(false);
  const [BoardState, setBoardState] = useState<Table>(initialData);

  const handleSetGameReady = async (rows: Block[][], players: Player[]) => {
    setIsGameReady(true);
    setBoardState((prevState) => ({
      ...prevState,
      table: rows,
      players: players,
    }));

    await requestNotifyGamePreparationComplete(
      initialData.tableUuid,
      rows,
      players
    );
    alert(`ゲームを開始します.${BoardState.players[0].name}のターンです}`);
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
