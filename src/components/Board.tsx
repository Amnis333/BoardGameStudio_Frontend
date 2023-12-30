import { useEffect } from "react";
import styles from "../styles/Board.module.css";
import { ApiGateway } from "../BoardController";
import { Table, Player, Piece, BoardProps } from "../useState/BoardState";
import useBoardState from "../useState/BoardState";
import GameSetPopUp from "./GameSetPopUp";
import { InitialPieceDisplay } from "./InitialPieceDisplay";
import { BoardRow } from "./BoardRow";

const PickedPiecesArea: React.FC<{ pieces: Piece[]; player: Player }> = ({
  pieces,
  player,
}) => (
  <div className={styles.dFlex}>
    {pieces.map((piece, index) => (
      <img
        key={player.name + index}
        src={`../img/${piece.type}Ghost.jpeg`}
        className={styles.ghostImg}
        alt="pickedpieces"
      ></img>
    ))}
  </div>
);

export const Board: React.FC<BoardProps> = ({ initialData, playMode }) => {
  const {
    boardInfo,
    setBoardInfo,
    playerUnsetPieces,
    players,
    setPlayers,
    handlePieceClick,
    handleBlockClick,
    isGameStarted,
    setIsGameStarted,
    turn,
    setTurn,
    isGameOver,
    setIsGameOver,
    winner,
    setWinner,
    playerPickedPieces,
  } = useBoardState(initialData, playMode);

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
        <InitialPieceDisplay
          pieces={playerUnsetPieces[1]}
          player={initialData.players[1]}
          onPieceClick={handlePieceClick}
          isCpu={true}
        />
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
        <InitialPieceDisplay
          pieces={playerUnsetPieces[0]}
          player={initialData.players[0]}
          onPieceClick={handlePieceClick}
          isCpu={false}
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
