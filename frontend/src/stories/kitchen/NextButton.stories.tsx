import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import NextButton from "./NextButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的NextButton(不要修改Template)
export default {
  title: "NextButton",
  component: NextButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NextButton>;

const Template: ComponentStory<typeof NextButton> = (args) => (
  <NextButton {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  type: "0",
};