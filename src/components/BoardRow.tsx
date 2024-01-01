import styles from "../styles/Board.module.css";

type Piece = {
  owner: string;
  type: string;
  position: number[] | undefined;
};

type Block = {
  address: number[];
  piece: Piece | undefined;
};

type BoardRowProps = {
  row: Block[];
  onBlockClick: (block: Block) => void;
  onPieceClick: (piece: Piece) => void;
};

export const BoardRow = (props: BoardRowProps) => (
  <div className={styles.row}>
    {props.row.map((square, col_i) => (
      <div
        key={"col" + col_i}
        className={styles.block}
        onClick={() => props.onBlockClick(square)}
      >
        {/*
                  todo
                  1. square.piece.owner === "cpu"とハードコードしているのをplayers[1]に直す
                  2. square.piece.ownerもisPlayer1などの変数にする
                  */}
        {square.piece && (
          <img
            src={
              square.piece.owner === "cpu"
                ? `/img/unknownGhost.jpeg`
                : `/img/${square.piece.type}Ghost.jpeg`
            }
            className={
              square.piece.owner === "cpu"
                ? `${styles.ghostImgSmall} ${styles.rotate}`
                : `${styles.ghostImgSmall}`
            }
            alt="piece"
          />
        )}
      </div>
    ))}
  </div>
);
