import styles from "../styles/Board.module.css";

type Piece = {
  owner: string;
  type: string;
  position: number[] | undefined;
};

type Player = {
  name: string;
  pieces: {
    [key: string]: Piece;
  };
  pickedBluePiecesCount: number;
  pickedRedPiecesCount: number;
};

type InitialPlayerPieceDisplayProps = {
  player: Player;
  onPieceClick: (piece: Piece) => void;
};

export const InitialPlayerPieceDisplay = ({
  player,
  onPieceClick,
}: InitialPlayerPieceDisplayProps) => {
  const unPlacedPieces = Object.values(player.pieces).filter(
    (piece) => piece.position === undefined
  );

  return (
    <div className={styles.dFlex}>
      {unPlacedPieces.map((piece, index) => (
        <img
          key={player.name + index}
          src={`/img/${piece.type}Ghost.jpeg`}
          className={`${styles.ghostImg}`}
          onClick={() => onPieceClick(piece)}
          alt="piece"
        ></img>
      ))}
    </div>
  );
};
