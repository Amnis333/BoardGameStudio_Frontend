import { Table, Piece, Block } from "./useState/BoardState";
import axios from "axios";

export class ApiGateway {
  private static gameId: number | null = null;
  public static getGameId(): number | null {
    return ApiGateway.gameId;
  }
  public static async initializeGame(
    player1: string,
    player2: string
  ): Promise<Table> {
    const playerData = [
      {
        name: player1,
      },
      {
        name: player2,
      },
    ];
    //todo リクエスト先をlocalhostから変更する
    const response = await axios.post(
      "https://board-game-studio.net/start/",
      playerData,
      { withCredentials: true }
    );
    if (response.data.game_id === null) {
      throw new Error("game is not initialized");
    }
    ApiGateway.gameId = response.data.id;
    console.log("game id is " + ApiGateway.gameId);
    console.log(response.data, "res");
    /* 
        デバッグ用メッセージ
        console.log("initialized");
        console.log(response);
        console.log("----------");
        */

    return response.data;
  }
  public static async getGameStete(): Promise<Table> {
    if (ApiGateway.gameId === null) {
      throw new Error("game is not initialized");
    }
    const response = await axios.get(
      `http://localhost:8000/game-state/${ApiGateway.gameId}`,
      { withCredentials: true }
    );
    return response.data;
  }
  public static async notifyGetReady(tableInfo: Table): Promise<Table> {
    //全てのコマの初期位置が確定したらコマの位置情報をサーバーに送信する
    const response = await axios.post(
      `http://localhost:8000/geister/${ApiGateway.gameId}/setup/`,
      tableInfo,
      { withCredentials: true }
    );
    /*
        デバッグ用メッセージ
        console.log("get ready");
        console.log(response);
        console.log("----------");
        */

    return response.data;
  }
  public static async movePiece(
    player_piece: Piece,
    piece_key: string,
    destination: Block
  ): Promise<Table> {
    //　リクエストに送る情報としてplayersはいらないかも
    const movementInfo = {
      player_piece: player_piece,
      piece_key: piece_key,
      destination: destination,
    };
    const response = await axios.post(
      `http://localhost:8000/geister/${ApiGateway.gameId}/player-move/`,
      movementInfo,
      { withCredentials: true }
    );
    console.log("moved");
    console.log(response);
    console.log("----------");
    return response.data;
  }
  public static async cpuMovePiece(): Promise<Table> {
    const response = await axios.post(
      `http://localhost:8000/geister/${ApiGateway.gameId}/cpu-move/`,
      {},
      { withCredentials: true }
    );
    console.log("cpu moved");
    console.log(response);
    console.log("----------");
    return response.data;
  }
}
