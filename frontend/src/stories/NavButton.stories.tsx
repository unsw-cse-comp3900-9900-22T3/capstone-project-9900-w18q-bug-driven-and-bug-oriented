import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import NavButton from "./NavButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的NavButton(不要修改Template)
export default {
  title: "NavButton",
  component: NavButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NavButton>;

const Template: ComponentStory<typeof NavButton> = (args) => (
  <NavButton {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  name: "111",
  id: "1",
  number: 0,
  item: 'hot',
  selected: true,
};