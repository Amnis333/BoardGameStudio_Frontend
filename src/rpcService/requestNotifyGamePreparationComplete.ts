import { GeisterServiceClient } from "@koheimatsuno99/boardgamestudio-grpc/pkg/geister/client/geister_service_grpc_web_pb";
import {
  NotifyGamePreparationCompletedRequest,
  Player as ProtoPlayer,
  Block as ProtoBlock,
  BlockRow as ProtoBlockRow,
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

type Player = {
  playerUuid: string;
  name: string;
  pieces: {
    [key: string]: Piece;
  };
  pickedBluePiecesCount: number;
  pickedRedPiecesCount: number;
};

type RequestNotifyGamePreparationComplete = (
  tableUuid: string,
  rows: Block[][],
  players: Player[]
) => Promise<void>;

export const requestNotifyGamePreparationComplete: RequestNotifyGamePreparationComplete =
  async (tableUuid, rows, players) => {
    return new Promise((_, reject) => {
      const req = new NotifyGamePreparationCompletedRequest();
      req.setTableUuid(tableUuid);

      const protoRows = rows.map((row) => {
        const blockRow = new ProtoBlockRow();
        const protoBlocks = row.map((block) => {
          const protoBlock = new ProtoBlock();
          protoBlock.setAddressList(block.address);
          if (block.piece) {
            const protoPiece = new ProtoPiece();
            protoPiece.setOwner(block.piece.owner);
            protoPiece.setPieceType(block.piece.type);
            protoPiece.setPositionList(block.piece.position);
            protoBlock.setPiece(protoPiece);
          }
          return protoBlock;
        });
        blockRow.setBlocksList(protoBlocks);
        return blockRow;
      });
      req.setBoardList(protoRows);

      const protoPlayers = players.map((player) => {
        const protoPlayer = new ProtoPlayer();
        protoPlayer.setPlayerUuid(player.playerUuid);
        protoPlayer.setName(player.name);
        protoPlayer.setPickedredpiecescount(player.pickedRedPiecesCount);
        protoPlayer.setPickedbluepiecescount(player.pickedBluePiecesCount);

        const piecesMap = player.pieces;
        Object.keys(piecesMap).forEach((key) => {
          const piece = piecesMap[key];
          const protoPiece = new ProtoPiece();
          protoPiece.setOwner(piece.owner);
          protoPiece.setPieceType(piece.type);
          protoPiece.setPositionList(piece.position);
          protoPlayer.getPiecesMap().set(key, protoPiece);
        });

        return protoPlayer;
      });
      req.setPlayersList(protoPlayers);

      geisterClient.notifyGamePreparationCompleted(req, {}, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
      });
    });
  };
