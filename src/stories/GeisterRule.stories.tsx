import type { Meta, StoryObj } from "@storybook/react";
import { GeisterRule } from "../components/GeisterRule";

const meta: Meta<typeof GeisterRule> = {
  title: "GeisterRule",
  component: GeisterRule,
  args: {
    playMode: "cpu",
  },
};

export default meta;

type Story = StoryObj<typeof GeisterRule>;

export const Pc: Story = {};
