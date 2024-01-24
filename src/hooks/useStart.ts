import { useQuery } from "@tanstack/react-query";

type StartParams = {
  player1Name: string;
  player2Name: string;
};

type Piece = {
  owner: string;
  type: string;
  position: number[] | undefined;
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

export type RequestStart = (params: StartParams) => Promise<Table>;

export const useStart = (request: RequestStart, params: StartParams) => {
  return useQuery({
    queryKey: ["start", params],
    queryFn: () => request(params),
  });
};
