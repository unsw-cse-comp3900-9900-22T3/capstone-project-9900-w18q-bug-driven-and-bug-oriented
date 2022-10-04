import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SubmitButton from "./SubmitButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的SubmitButton(不要修改Template)
export default {
  title: "SubmitButton",
  component: SubmitButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SubmitButton>;

const Template: ComponentStory<typeof SubmitButton> = (args) => (
  <SubmitButton {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  shown: true,
};