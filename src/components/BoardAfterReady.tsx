import { useEffect } from "react";
import styles from "../styles/Board.module.css";
import { ApiGateway } from "../BoardController";
import useBoardState from "../useState/BoardState";
import GameSetPopUp from "./GameSetPopUp";
import { InitialPlayerPieceDisplay } from "./InitialPlayerPieceDisplay";
import { BoardRow } from "./BoardRow";
import { PickedPiecesArea } from "./PickedPiecesArea";

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

export const BoardAfterReady = ({ initialData, playMode }: BoardProps) => {
  const {
    boardInfo,
    setBoardInfo,
    playerUnsetPieces,
    setPlayers,
    handlePieceClick,
    handleBlockClick,
    turn,
    setTurn,
    isGameOver,
    setIsGameOver,
    winner,
    setWinner,
    playerPickedPieces,
  } = useBoardState(initialData, playMode);

  useEffect(() => {
    if (turn === 1) {
      ApiGateway.cpuMovePiece().then((res) => {
        setPlayers(res.players);
        setBoardInfo(res.table);
        setTurn(res.turn);
        if (res.winner !== "") {
          setIsGameOver(true);
          setWinner(res.winner);
        }
      });
    }
  }, [turn, setTurn, setPlayers, setBoardInfo, setIsGameOver, setWinner]);

  return (
    <div className={styles.container}>
      <div className={styles.capturedPiecesTop}>
        {
          <PickedPiecesArea
            pieces={playerPickedPieces[1]}
            player={initialData.players[1]}
          />
        }
      </div>
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
        {
          <PickedPiecesArea
            pieces={playerPickedPieces[0]}
            player={initialData.players[0]}
          />
        }
      </div>

      {isGameOver && <GameSetPopUp winner={winner} />}
    </div>
  );
};
