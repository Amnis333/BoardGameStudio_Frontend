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

type PickedPiecesAreaProps = {
  pieces: Piece[];
  player: Player;
};

export const PickedPiecesArea = (props: PickedPiecesAreaProps) => (
  <div className={styles.dFlex}>
    {props.pieces.map((piece, index) => (
      <img
        key={props.player.name + index}
        src={`/public/img/${piece.type}Ghost.jpeg`}
        className={styles.ghostImg}
        alt="pickedpieces"
      ></img>
    ))}
  </div>
);
