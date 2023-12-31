import type { Meta, StoryObj } from "@storybook/react";
import { InitialPlayerPieceDisplay } from "../components/InitialPlayerPieceDisplay";

const meta: Meta<typeof InitialPlayerPieceDisplay> = {
  title: "InitialPlayerPieceDisplay",
  component: InitialPlayerPieceDisplay,
  args: {
    player: {
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
      },
      pickedBluePiecesCount: 0,
      pickedRedPiecesCount: 0,
    },
  },
};

export default meta;

type Story = StoryObj<typeof InitialPlayerPieceDisplay>;

export const Pc: Story = {};
