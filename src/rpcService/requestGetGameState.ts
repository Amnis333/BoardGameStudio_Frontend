import { GeisterServiceClient } from "@koheimatsuno99/boardgamestudio-grpc/pkg/geister/client/geister_service_grpc_web_pb";
import { GetGameStateRequest } from "@koheimatsuno99/boardgamestudio-grpc/pkg/geister/client/geister_service_pb";

const hostName = import.meta.env.VITE_CLIENT_URL_LOCAL;
if (!hostName) {
  throw new Error("CLIENT_URL_LOCAL is not defined");
}
const geisterClient = new GeisterServiceClient(hostName);

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
  table: Block[][];
  winner: string;
  turn: number;
  tableUuid: string;
};

type RequestGetGameState = (tableUuid: string) => Promise<Table>;

export const requestGetGameState: RequestGetGameState = async (tableUuid) => {
  return new Promise((resolve, reject) => {
    const req = new GetGameStateRequest();
    req.setTableUuid(tableUuid);
    geisterClient.getGameState(req, {}, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (res) {
        const gameState = res.getGameState();
        if (gameState === undefined) {
          reject("gameState is undefined");
          return;
        }
        const gameStateObj = gameState.toObject();
        const players: Player[] = gameStateObj.playersList.map((playerObj) => {
          const pieces: { [key: string]: Piece } = {};
          playerObj.piecesMap.forEach(([key, pieceObj]) => {
            pieces[key] = {
              owner: pieceObj.owner,
              type: pieceObj.pieceType,
              position: pieceObj.positionList,
            };
          });
          return {
            name: playerObj.name,
            pieces: pieces,
            pickedBluePiecesCount: playerObj.pickedbluepiecescount,
            pickedRedPiecesCount: playerObj.pickedredpiecescount,
          };
        });
        const table: Block[][] = gameStateObj.boardList.map((row) => {
          return row.blocksList.map((blockObj) => {
            const pieceObj = blockObj.piece;
            let piece: Piece | undefined = undefined;
            if (pieceObj !== undefined) {
              piece = {
                owner: pieceObj.owner,
                type: pieceObj.pieceType,
                position: pieceObj.positionList,
              };
            }
            return {
              address: blockObj.addressList,
              piece: piece,
            };
          });
        });
        resolve({
          players: players,
          table: table,
          winner: "",
          turn: gameStateObj.turn,
          tableUuid: gameStateObj.tableUuid,
        });
      }
    });
  });
};
