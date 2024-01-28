import styles from "../styles/Board.module.css";
import GameSetPopUp from "./GameSetPopUp";
import { BoardRow } from "./BoardRow";
import { PickedPiecesArea } from "./PickedPiecesArea";
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

export const BoardAfterReady = ({ initialData }: BoardProps) => {
  const [turn, setTurn] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState<Piece>();
  const [players, setPlayers] = useState<Player[]>(initialData.players);
  const [rows, setRows] = useState<Block[][]>(initialData.table);
  const [pickedPieces, setPickedPieces] = useState<Piece[][]>([[], []]);
  const handleCpuMove = () => {
    // Cpuのターンの処理
    //　リクエストを送る
    // setPlayers(res.players);
    // setBoardInfo(res.table);
    // setTurn(res.turn);
  };

  if (turn === 1) {
    handleCpuMove();
  }

  const handlePieceClick = (piece: Piece) => {
    if (players[turn].name !== piece.owner) {
      alert(`今は${players[turn].name}のターンです`);
      return;
    }
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
      handleMovement(selectedPiece, block);
    }
  };

  const handleMovement = (piece: Piece, dest: Block) => {
    const newPiece = { ...piece, position: dest.address };
  };

  return (
    <div className={styles.container}>
      <div className={styles.capturedPiecesTop}>
        {<PickedPiecesArea pieces={pickedPieces[1]} player={players[1]} />}
      </div>
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
        {<PickedPiecesArea pieces={pickedPieces[0]} player={players[0]} />}
      </div>

      {/* {isGameOver && <GameSetPopUp winner={winner} />} */}
    </div>
  );
};
