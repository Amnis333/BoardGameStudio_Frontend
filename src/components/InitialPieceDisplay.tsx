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

type InitialPieceDisplayProps = {
  pieces: Piece[];
  player: Player;
  isCpu: boolean;
  onPieceClick: (piece: Piece) => void;
};

export const InitialPieceDisplay = ({
  pieces,
  player,
  isCpu,
  onPieceClick,
}: InitialPieceDisplayProps) => {
  return (
    <div className={styles.dFlex}>
      {Object.values(pieces)
        .filter((piece) => piece.owner === player.name)
        .map((piece, index) => (
          <img
            key={player.name + index}
            src={
              isCpu
                ? `/public/img/unknownGhost.jpeg`
                : `/public/img/${piece.type}Ghost.jpeg`
            }
            className={
              isCpu
                ? `${styles.ghostImg} ${styles.rotate}`
                : `${styles.ghostImg}`
            }
            onClick={() => onPieceClick(piece)}
            alt="piece"
          ></img>
        ))}
    </div>
  );
};
