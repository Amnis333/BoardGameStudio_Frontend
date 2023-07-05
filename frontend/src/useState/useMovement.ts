import { Player, Block, Piece } from "./BoardState";
import { ApiGateway } from "../BoardController";
import useValidateMovement from "./useValidateMovement";

const useMovement = (
  players: Player[],
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
  setSelectedPiece: React.Dispatch<React.SetStateAction<Piece | null>>,
  setBoardInfo: React.Dispatch<React.SetStateAction<Block[][]>>,
  setTurn: React.Dispatch<React.SetStateAction<number>>,
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>,
  setWinner: React.Dispatch<React.SetStateAction<string>>,
  playerPickedPieces: Piece[][],
  setPlayerPickedPieces: React.Dispatch<React.SetStateAction<Piece[][]>>
) => {
  const useHandleMovement = (selectedPiece: Piece, block: Block) => {
    const validateMovement = useValidateMovement();
    if (!validateMovement(selectedPiece, block)) {
      return;
    }
    // selectedPieceKeyを探す
    let selectedPieceKey: string | null = null;
    const currentPlayer = players.find(
      (player) => player.name === selectedPiece.owner
    );
    console.log("Current player: ", currentPlayer);
    if (currentPlayer) {
      const keys = Object.keys(currentPlayer.pieces);
      const values = Object.values(currentPlayer.pieces);
      for (let i = 0; i < keys.length; i++) {
        const value = values[i];
        if (
          value.owner === selectedPiece.owner &&
          value.type === selectedPiece.type &&
          value.position[0] === selectedPiece.position[0] &&
          value.position[1] === selectedPiece.position[1]
        ) {
          selectedPieceKey = keys[i];
          console.log("selectedPieceKey: ", selectedPieceKey);
          break;
        }
      }
    }
    let pieceOfPositionUpdated = { ...selectedPiece, position: block.address };
    setBoardInfo((board) =>
      board.map((row) =>
        row.map((b) => {
          if (b === block) return { ...b, piece: pieceOfPositionUpdated };
          if (b.piece === selectedPiece) return { ...b, piece: null };
          return b;
        })
      )
    );
    setPlayers((players) =>
      players.map((player) => ({
        ...player,
        pieces: Object.entries(player.pieces).reduce((obj, [key, value]) => {
          obj[key] = value === selectedPiece ? pieceOfPositionUpdated : value;
          return obj;
        }, {} as { [key: string]: Piece }),
      }))
    );
    // 相手のコマを取る
    // todo イベントの判定をコマからマスにする（今の状態ではコマの画像にあたるため、イベントが発火しない）
    if (block.piece?.owner && block.piece.owner !== selectedPiece.owner) {
      /*
            todo 取ったコマは自分のコマ置き場に移動（コマは再利用できないことに注意）
            */
      const playerIndex = players.findIndex(
        (player) => player.name === selectedPiece.owner
      );
      const pickedList = playerPickedPieces[playerIndex];
      pickedList.push(block.piece);
      console.log("pickedList: ", pickedList);
      setPlayerPickedPieces((playerPickedPieces) =>
        playerPickedPieces.map((list, index) =>
          index === playerIndex ? [...pickedList] : list
        )
      );
      console.log("playerPickedPieces: ", playerPickedPieces);
      //盤面を再描画
      const newBlock = { ...block, piece: selectedPiece };
      setBoardInfo((board) =>
        board.map((row) => row.map((b) => (b === block ? newBlock : b)))
      );
    }
    if (selectedPieceKey === null) {
      alert("あなたのコマではないので動かせません");
      setSelectedPiece(null);
      return;
    } else {
      ApiGateway.movePiece(selectedPiece, selectedPieceKey, block).then(
        (res) => {
          setPlayers(res.players);
          setBoardInfo(res.table);
          setTurn(res.turn);
          if (res.winner !== "") {
            setIsGameOver(true);
            setWinner(res.winner);
          }
        }
      );
      setSelectedPiece(null);
    }
  };
  return useHandleMovement;
};

export default useMovement;
