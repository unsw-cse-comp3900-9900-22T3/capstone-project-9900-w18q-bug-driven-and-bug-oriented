import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BigButton from "./BigButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的BigButton(不要修改Template)
export default {
  title: "BigButton",
  component: BigButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof BigButton>;

const Template: ComponentStory<typeof BigButton> = (args) => (
  <BigButton {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  name: "111",
  confirm: true,

};