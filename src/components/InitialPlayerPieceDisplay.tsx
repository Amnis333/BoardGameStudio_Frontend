import styles from "../styles/Board.module.css";

type Piece = {
  owner: string;
  type: string;
  position: number[];
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
  pieces: Piece[];
  player: Player;
  onPieceClick: (piece: Piece) => void;
};

export const InitialPlayerPieceDisplay = ({
  pieces,
  player,
  onPieceClick,
}: InitialPlayerPieceDisplayProps) => {
  return (
    <div className={styles.dFlex}>
      {Object.values(pieces)
        .filter((piece) => piece.owner === player.name)
        .map((piece, index) => (
          <img
            key={player.name + index}
            src={`/public/img/${piece.type}Ghost.jpeg`}
            className={`${styles.ghostImg}`}
            onClick={() => onPieceClick(piece)}
            alt="piece"
          ></img>
        ))}
    </div>
  );
};
