import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BorderButton from "./BorderButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的BorderButton(不要修改Template)
export default {
  title: "BorderButton",
  component: BorderButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof BorderButton>;

const Template: ComponentStory<typeof BorderButton> = (args) => (
  <BorderButton {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  number: '1',
  selected: false,
  doSomething:()=>{},
};