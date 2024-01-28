import { GeisterServiceClient } from "boardgamestudio-grpc/pkg/geister/client/geister_service_grpc_web_pb";
import { StartRequest } from "boardgamestudio-grpc/pkg/geister/client/geister_service_pb";
import { RequestStart } from "../hooks/useStart";

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
  gameId: string;
};

export const requestStart: RequestStart = async (params) => {
  return new Promise((resolve, reject) => {
    const req = new StartRequest();
    req.setPlayer1Name(params.player1Name);
    req.setPlayer2Name(params.player2Name);
    geisterClient.start(req, {}, (err, res) => {
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
          // playerObjをPlayer型に変換します
          return {
            name: playerObj.name,
            pieces: pieces,
            pickedBluePiecesCount: playerObj.pickedbluepiecescount,
            pickedRedPiecesCount: playerObj.pickedredpiecescount,
          };
        });

        const rows: Block[][] = gameStateObj.boardList.map((blockRow) => {
          // blockRowをBlock[]型に変換します
          return blockRow.blocksList.map((blockObj) => {
            // blockObjをBlock型に変換します
            return {
              address: blockObj.addressList,
              piece: blockObj.piece
                ? {
                    owner: blockObj.piece.owner,
                    type: blockObj.piece.pieceType,
                    position: blockObj.piece.positionList,
                  }
                : undefined,
            };
          });
        });

        const table: Table = {
          players: players,
          table: rows,
          winner: "",
          turn: gameStateObj.turn,
          gameId: gameStateObj.tableUuid,
        };
        resolve(table);
      }
    });
  });
};
