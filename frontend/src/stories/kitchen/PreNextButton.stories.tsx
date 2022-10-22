import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PreNextButton from "./PreNextButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的NextButton(不要修改Template)
export default {
  title: "PreNextButton",
  component: PreNextButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof PreNextButton>;

const Template: ComponentStory<typeof PreNextButton> = (args) => (
  <PreNextButton {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  type: "0",
};