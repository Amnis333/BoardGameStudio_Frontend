import type { Meta, StoryObj } from "@storybook/react";
import { BoardBeforeReady } from "../components/BoardBeforeReady";

const meta: Meta<typeof BoardBeforeReady> = {
  title: "BoardBeforeReady",
  component: BoardBeforeReady,
  args: {
    initialData: {
      players: [
        {
          name: "player1",
          pieces: {
            piece1: {
              owner: "player1",
              type: "blue",
              position: [0, 0],
            },
            piece2: {
              owner: "player1",
              type: "red",
              position: [0, 0],
            },
            piece3: {
              owner: "player1",
              type: "blue",
              position: [0, 0],
            },
            piece4: {
              owner: "player1",
              type: "red",
              position: [0, 0],
            },
            piece5: {
              owner: "player1",
              type: "blue",
              position: [0, 0],
            },
            piece6: {
              owner: "player1",
              type: "red",
              position: [0, 0],
            },
            piece7: {
              owner: "player1",
              type: "blue",
              position: [0, 0],
            },
            piece8: {
              owner: "player1",
              type: "red",
              position: [0, 0],
            },
          },
          pickedBluePiecesCount: 0,
          pickedRedPiecesCount: 0,
        },
        {
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
        ],
        [
          { address: [1, 0], piece: undefined },
          { address: [1, 1], piece: undefined },
          { address: [1, 2], piece: undefined },
          { address: [1, 3], piece: undefined },
        ],
        [
          { address: [2, 0], piece: undefined },
          { address: [2, 1], piece: undefined },
          { address: [2, 2], piece: undefined },
          { address: [2, 3], piece: undefined },
        ],
        [
          { address: [3, 0], piece: undefined },
          { address: [3, 1], piece: undefined },
          { address: [3, 2], piece: undefined },
          { address: [3, 3], piece: undefined },
        ],
      ],
      turn: 0,
      gameId: null,
    },
  },
};

export default meta;

type Story = StoryObj<typeof BoardBeforeReady>;

export const Pc: Story = {};
