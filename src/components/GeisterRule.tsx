import styles from "../styles/GeisterRule.module.css";
import { Lobby } from "./Lobby";
import { Board } from "./Board";
import { PlayContext } from "./PlayContext";
import { useState, useContext } from "react";
import { requestStart } from "../rpcService/requestStart";

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
  playerUuid: string;
  name: string;
  pieces: {
    [key: string]: Piece;
  };
  pickedBluePiecesCount: number;
  pickedRedPiecesCount: number;
};

type Table = {
  players: Player[];
  table: Block[][];
  winner: string;
  turn: number;
  tableUuid: string;
};

export const GeisterRule = () => {
  const [doesGoBack, setGoback] = useState(false);
  const [initialTable, setInitialTable] = useState<Table>();
  const playContext = useContext(PlayContext);

  const handleGoback = () => {
    setGoback(true);
  };

  const handlePlay = async () => {
    const data = await requestStart({
      player1Name: "player1",
      player2Name: "player2",
    });
    setInitialTable(data);

    if (playContext) {
      playContext.setDoesPlay(true);
    }
  };

  if (doesGoBack) {
    return <Lobby />;
  }

  if (playContext && playContext.doesPlay) {
    if (initialTable === undefined) {
      throw new Error("initialTable is undefined");
    }
    return <Board initialData={initialTable} />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h3>ガイスターのルール</h3>
        <p>ゲームの目的は、相手のゴーストを捕まえることです。</p>
        <p>
          ゴーストは、赤と青の2色があります。ただし、相手のゴーストの種類は捕まえるまでわかりません。
        </p>
        <div className={styles.imgContainer}>
          <div>
            <img
              src="/img/blueGhost.jpeg"
              alt="blueGhost"
              className={styles.imgSize}
            ></img>
            <p className="ghostName">ゴースト（青）</p>
          </div>
          <div>
            <img
              src="/img/redGhost.jpeg"
              alt="blueGhost"
              className={styles.imgSize}
            ></img>
            <p className={styles.ghostName}>ゴースト（赤）</p>
          </div>
          <div>
            <img
              src="/img/unknownGhost.jpeg"
              alt="blueGhost"
              className={styles.imgSize}
            ></img>
            <p className={styles.ghostName}>ゴースト（敵）</p>
          </div>
        </div>
        <p>各プレイヤーから見て相手側の角のマスは脱出マスとなっています。</p>
        <p>
          自分の青ゴーストが脱出マスに到達し、その次のターンで取られなければ、そのゴーストはボードから脱出します。
        </p>
        <p>
          勝利条件は、「相手の青ゴーストを全て取る」「自分の赤ゴーストを全て取らせる」「自分の青ゴーストを脱出させる」のどれかを満たすことです。
        </p>
      </div>
      <div className={styles.buttonArea}>
        <button className={styles.button} onClick={handleGoback}>
          Go Back
        </button>
        <button className={styles.button} onClick={handlePlay}>
          Play
        </button>
      </div>
    </div>
  );
};
