import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DishCard from "./DishCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "DishCard",
  component: DishCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof DishCard>;

const Template: ComponentStory<typeof DishCard> = (args) => (
  <DishCard {...args} />
);

export const Test = Template.bind({});
Test.args = {
  props1: "111",
  props2: "222",
};