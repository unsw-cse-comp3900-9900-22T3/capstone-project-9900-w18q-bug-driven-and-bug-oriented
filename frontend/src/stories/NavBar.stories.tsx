import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import NavBar from "./NavBar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的NavBar(不要修改Template)
export default {
  title: "NavBar",
  component: NavBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => (
  <NavBar {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  obj: [],
  show: 'request',
  role: 'customer',
};