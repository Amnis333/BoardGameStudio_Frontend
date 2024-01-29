import type { Meta, StoryObj } from "@storybook/react";
import { BoardBeforeReady } from "../components/BoardBeforeReady";

const meta: Meta<typeof BoardBeforeReady> = {
  title: "BoardBeforeReady",
  component: BoardBeforeReady,
  args: {
    initialData: {
      players: [
        {
          playerUuid: "player1Uuid",
          name: "player1",
          pieces: {
            piece1: {
              owner: "player1",
              type: "blue",
              position: [],
            },
            piece2: {
              owner: "player1",
              type: "red",
              position: [],
            },
            piece3: {
              owner: "player1",
              type: "blue",
              position: [],
            },
            piece4: {
              owner: "player1",
              type: "red",
              position: [],
            },
            piece5: {
              owner: "player1",
              type: "blue",
              position: [],
            },
            piece6: {
              owner: "player1",
              type: "red",
              position: [],
            },
            piece7: {
              owner: "player1",
              type: "blue",
              position: [],
            },
            piece8: {
              owner: "player1",
              type: "red",
              position: [],
            },
          },
          pickedBluePiecesCount: 0,
          pickedRedPiecesCount: 0,
        },
        {
          playerUuid: "player2Uuid",
          name: "player2",
          pieces: {
            piece1: {
              owner: "player2",
              type: "blue",
              position: [0, 0],
            },
            piece2: {
              owner: "player2",
              type: "red",
              position: [0, 0],
            },
          },
          pickedBluePiecesCount: 0,
          pickedRedPiecesCount: 0,
        },
      ],
      winner: "",
      table: [
        [
          { address: [0, 0], piece: undefined },
          { address: [0, 1], piece: undefined },
          { address: [0, 2], piece: undefined },
          { address: [0, 3], piece: undefined },
          { address: [0, 4], piece: undefined },
          { address: [0, 5], piece: undefined },
          { address: [0, 6], piece: undefined },
          { address: [0, 7], piece: undefined },
        ],
        [
          { address: [1, 0], piece: undefined },
          { address: [1, 1], piece: undefined },
          { address: [1, 2], piece: undefined },
          { address: [1, 3], piece: undefined },
          { address: [1, 4], piece: undefined },
          { address: [1, 5], piece: undefined },
          { address: [1, 6], piece: undefined },
          { address: [1, 7], piece: undefined },
        ],
        [
          { address: [2, 0], piece: undefined },
          { address: [2, 1], piece: undefined },
          { address: [2, 2], piece: undefined },
          { address: [2, 3], piece: undefined },
          { address: [2, 4], piece: undefined },
          { address: [2, 5], piece: undefined },
          { address: [2, 6], piece: undefined },
          { address: [2, 7], piece: undefined },
        ],
        [
          { address: [3, 0], piece: undefined },
          { address: [3, 1], piece: undefined },
          { address: [3, 2], piece: undefined },
          { address: [3, 3], piece: undefined },
          { address: [3, 4], piece: undefined },
          { address: [3, 5], piece: undefined },
          { address: [3, 6], piece: undefined },
          { address: [3, 7], piece: undefined },
        ],
        [
          { address: [4, 0], piece: undefined },
          { address: [4, 1], piece: undefined },
          { address: [4, 2], piece: undefined },
          { address: [4, 3], piece: undefined },
          { address: [4, 4], piece: undefined },
          { address: [4, 5], piece: undefined },
          { address: [4, 6], piece: undefined },
          { address: [4, 7], piece: undefined },
        ],
        [
          { address: [5, 0], piece: undefined },
          { address: [5, 1], piece: undefined },
          { address: [5, 2], piece: undefined },
          { address: [5, 3], piece: undefined },
          { address: [5, 4], piece: undefined },
          { address: [5, 5], piece: undefined },
          { address: [5, 6], piece: undefined },
          { address: [5, 7], piece: undefined },
        ],
        [
          { address: [6, 0], piece: undefined },
          { address: [6, 1], piece: undefined },
          { address: [6, 2], piece: undefined },
          { address: [6, 3], piece: undefined },
          { address: [6, 4], piece: undefined },
          { address: [6, 5], piece: undefined },
          { address: [6, 6], piece: undefined },
          { address: [6, 7], piece: undefined },
        ],
        [
          { address: [7, 0], piece: undefined },
          { address: [7, 1], piece: undefined },
          { address: [7, 2], piece: undefined },
          { address: [7, 3], piece: undefined },
          { address: [7, 4], piece: undefined },
          { address: [7, 5], piece: undefined },
          { address: [7, 6], piece: undefined },
          { address: [7, 7], piece: undefined },
        ],
      ],
      turn: 0,
      tableUuid: "tableUuid",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BoardBeforeReady>;

export const Pc: Story = {};
