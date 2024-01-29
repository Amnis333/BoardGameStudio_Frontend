import { GeisterServiceClient } from "@koheimatsuno99/boardgamestudio-grpc/pkg/geister/client/geister_service_grpc_web_pb";
import { UpdateGameStateByCpuMovementRequest } from "@koheimatsuno99/boardgamestudio-grpc/pkg/geister/client/geister_service_pb";

const hostName = import.meta.env.VITE_CLIENT_URL_LOCAL;
if (!hostName) {
  throw new Error("CLIENT_URL_LOCAL is not defined");
}
const geisterClient = new GeisterServiceClient(hostName);

type RequestUpdateGameStateByCpuMovement = (tableUuid: string) => Promise<void>;

export const requestUpdateGameStateByCpuMovement: RequestUpdateGameStateByCpuMovement =
  (tableUuid) => {
    return new Promise((_, reject) => {
      const req = new UpdateGameStateByCpuMovementRequest();
      req.setTableUuid(tableUuid);

      geisterClient.updateGameStateByCpuMove(req, {}, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
      });
    });
  };
