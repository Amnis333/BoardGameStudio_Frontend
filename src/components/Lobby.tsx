import { useContext, useEffect, useState } from "react";
import "../styles/Lobby.module.css";
import GeisterRule from "./GeisterRule";
import { PlayContext } from "./PlayContext";
import React from "react";

export const Lobby: React.FC = () => {
  const [showGeisterRule, setGeisterRule] = useState<boolean>(false);
  const [playMode, setPlayMode] = useState<string>("");
  const playContext = useContext(PlayContext);

  useEffect(() => {
    if (playContext && !playContext.doesPlay) {
      setGeisterRule(false);
    }
  }, [playContext]);
  const handleClick = () => {
    setGeisterRule(true);
    setPlayMode("vscpu");
  };
  return showGeisterRule ? (
    <GeisterRule playMode={playMode} />
  ) : (
    <div className="container">
      <div className="background">
        <button className="button" id="single-mode-btn" onClick={handleClick}>
          Play<br></br>(click here!)
        </button>
      </div>
    </div>
  );
};
