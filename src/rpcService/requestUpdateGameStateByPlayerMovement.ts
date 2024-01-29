import { GeisterServiceClient } from "@koheimatsuno99/boardgamestudio-grpc/pkg/geister/client/geister_service_grpc_web_pb";
import {
  UpdateGameStateByPlayerMovementRequest,
  Block as ProtoBlock,
  Piece as ProtoPiece,
} from "@koheimatsuno99/boardgamestudio-grpc/pkg/geister/client/geister_service_pb";

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

type RequestUpdateGameStateByPlayerMovement = (
  tableUuid: string,
  pieceKey: string,
  dest: Block
) => Promise<void>;

export const requestUpdateGameStateByPlayerMovement: RequestUpdateGameStateByPlayerMovement =
  async (tableUuid, pieceKey, dest) => {
    return new Promise((_, reject) => {
      const req = new UpdateGameStateByPlayerMovementRequest();
      req.setTableUuid(tableUuid);
      req.setPieceKey(pieceKey);
      const destObj = new ProtoBlock();
      destObj.setAddressList(dest.address);
      if (dest.piece) {
        const pieceObj = new ProtoPiece();
        pieceObj.setOwner(dest.piece.owner);
        pieceObj.setPieceType(dest.piece.type);
        pieceObj.setPositionList(dest.piece.position);
        destObj.setPiece(pieceObj);
      }
      req.setDest(destObj);

      geisterClient.updateGameStateByPlayerMove(req, {}, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
      });
    });
  };
