import { useEffect, useState } from "react";
import styles from "../styles/Board.module.css";
import { ApiGateway } from "../BoardController";
import useBoardState from "../useState/BoardState";
import { InitialPlayerPieceDisplay } from "./InitialPlayerPieceDisplay";
import { BoardRow } from "./BoardRow";

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

type BoardBeforeReadyProps = {
  initialData: Table;
  playMode: string;
  onGameReady?: () => void;
};

export const BoardBeforeReady = ({
  initialData,
  playMode,
  onGameReady,
}: BoardBeforeReadyProps) => {
  const {
    boardInfo,
    setBoardInfo,
    playerUnsetPieces,
    players,
    setPlayers,
    //handlePieceClick,
    //handleBlockClick,
    isGameStarted,
    setIsGameStarted,
  } = useBoardState(initialData, playMode);

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
      handleInitialPosition(selectedPiece!, block);
    }
  };

  const handleInitialPosition = (piece: Piece, block: Block) => {
    // pieceの位置をblockの位置に変更する
    const newPiece = { ...piece };
    newPiece.position = block.address;
    const newBlock = { ...block };
    newBlock.piece = newPiece;
  };

  useEffect(() => {
    const allPiecesSet = playerUnsetPieces.every(
      (pieces) => pieces.length === 0
    );
    if (allPiecesSet && !isGameStarted) {
      console.log("all pieces set");
      const gameData: Table = {
        players: players,
        winner: "",
        table: boardInfo,
        turn: 0,
        gameId: ApiGateway.getGameId(),
      };
      console.log(gameData);
      ApiGateway.notifyGetReady(gameData).then((res) => {
        setPlayers(res.players);
        setBoardInfo(res.table);
        setIsGameStarted(true);
        alert(`ゲームスタート！${players[0].name}の番です`);
      });
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.capturedPiecesTop}></div>
      <div className={styles.board}>
        {boardInfo.map((row, row_i) => (
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
          player={initialData.players[0]}
          onPieceClick={handlePieceClick}
        />
      </div>
    </div>
  );
};
