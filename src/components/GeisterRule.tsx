import styles from "../styles/GeisterRule.module.css";
import { Lobby } from "./Lobby";
import { Board } from "./Board";
import { Table } from "../useState/BoardState";
import { ApiGateway } from "../BoardController";
import { PlayContext } from "./PlayContext";
import React, { useState, useContext } from "react";

interface GeisterRuleProps {
  playMode: string;
}
export const GeisterRule = (props: GeisterRuleProps) => {
  const [doesGoBack, setGoback] = useState(false);
  const [initialTable, setInitialTable] = useState<Table | null>(null);
  const playContext = useContext(PlayContext);
  const handleGoback = () => {
    setGoback(true);
  };
  const handlePlay = async () => {
    const initialData = await ApiGateway.initializeGame("you", "cpu");
    setInitialTable(initialData);
    if (playContext) {
      playContext.setDoesPlay(true);
    }
  };
  if (doesGoBack) {
    return <Lobby />;
  }
  if (playContext && playContext.doesPlay) {
    if (initialTable === null) {
      throw new Error("initialTable is null");
    }
    return <Board initialData={initialTable} playMode={props.playMode} />;
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
