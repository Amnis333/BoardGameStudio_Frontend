import { useState } from "react";
import styles from "../styles/Board.module.css";
import { InitialPlayerPieceDisplay } from "./InitialPlayerPieceDisplay";
import { BoardRow } from "./BoardRow";

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

type BoardBeforeReadyProps = {
  initialData: Table;
  playMode: string;
  onGameReady: () => void;
};

export const BoardBeforeReady = ({
  initialData,
  onGameReady,
}: BoardBeforeReadyProps) => {
  const [rows, setRows] = useState<Block[][]>(initialData.table);
  const [players, setPlayers] = useState<Player[]>(initialData.players);
  const [selectedPiece, setSelectedPiece] = useState<Piece>();

  const handlePieceClick = (piece: Piece) => {
    setSelectedPiece(piece);
    console.log("Piece Selected!");
  };

  const handleBlockClick = (block: Block) => {
    if (selectedPiece === undefined && block.piece !== undefined) {
      handlePieceClick(block.piece);
    } else if (selectedPiece === undefined) {
      alert("コマを選択してください");
      return;
    } else {
      handleSetInitialPosition(selectedPiece, block);
    }
  };

  const handleSetInitialPosition = (piece: Piece, block: Block) => {
    if (!isValidSetInitialPlacement(piece, block)) {
      return;
    }
    const newPiece = { ...piece, position: block.address };
    setRows((rows) =>
      rows.map((row) =>
        row.map((b) => (b === block ? { ...b, piece: newPiece } : b))
      )
    );
    setPlayers((prevPlayers) => {
      const newPlayers = prevPlayers.map((player) => ({
        ...player,
        pieces: Object.entries(player.pieces).reduce((obj, [key, value]) => {
          obj[key] = value === piece ? newPiece : value;
          return obj;
        }, {} as { [key: string]: Piece }),
      }));

      // 新しいステートに基づいてチェックを実行
      checkIfAllPiecesPlaced(newPlayers);
      return newPlayers;
    });
    setSelectedPiece(undefined);
  };

  const checkIfAllPiecesPlaced = (updatedPlayers: Player[]) => {
    const allPlaced = Object.values(updatedPlayers[0].pieces).every(
      (piece) => piece.position !== undefined
    );

    if (allPlaced) {
      setTimeout(() => onGameReady(), 0); // 全てのピースが配置されていればゲームを開始する
      console.log("Game Ready!");
    }
  };

  const isValidSetInitialPlacement = (selectedPiece: Piece, block: Block) => {
    if (!selectedPiece) {
      alert("コマを選択してください");
      return false;
    }
    if (block.piece) {
      alert("そのマスにはコマがすでに存在します");
      return false;
    }
    if (selectedPiece.position !== undefined) {
      alert("そのコマはすでに配置されています。残りのコマを配置してください。");
      return false;
    }
    const playerIndex = players.findIndex(
      (player) => player.name === selectedPiece.owner
    );
    if (playerIndex === -1) {
      alert("そのコマはすでに配置されています。残りのコマを配置してください。");
      return false;
    }
    const validPlacementRange = [
      { rowStart: 6, rowEnd: 7, colStart: 0, colEnd: 7 },
      { rowStart: 0, rowEnd: 1, colStart: 0, colEnd: 7 },
    ];
    const { rowStart, rowEnd, colStart, colEnd } =
      validPlacementRange[playerIndex];
    const [selectedRow, selectedCol] = block.address;
    if (
      selectedRow < rowStart ||
      selectedRow > rowEnd ||
      selectedCol < colStart ||
      selectedCol > colEnd
    ) {
      alert("初期位置は手前の2行の範囲にコマを置いてください");
      return false;
    } else if (
      playerIndex === 0 &&
      selectedRow === rowEnd &&
      (selectedCol === colStart || selectedCol === colEnd)
    ) {
      alert("相手プレイヤーの脱出マスを初期位置に設定することはできません");
      return false;
    } else if (
      playerIndex === 1 &&
      selectedRow === rowStart &&
      (selectedCol === colStart || selectedCol === colEnd)
    ) {
      alert("相手プレイヤーの脱出マスを初期位置に設定することはできません");
      return false;
    }
    return true;
  };

  return (
    <div className={styles.container}>
      <div className={styles.capturedPiecesTop}></div>
      <div className={styles.board}>
        {rows.map((row, row_i) => (
          <BoardRow
            key={"row" + row_i}
            row={row}
            onBlockClick={handleBlockClick}
            onPieceClick={handlePieceClick}
          />
        ))}
      </div>
      <div className={styles.capturedPiecesBottom}>
        <InitialPlayerPieceDisplay
          player={players[0]}
          onPieceClick={handlePieceClick}
        />
      </div>
    </div>
  );
};
