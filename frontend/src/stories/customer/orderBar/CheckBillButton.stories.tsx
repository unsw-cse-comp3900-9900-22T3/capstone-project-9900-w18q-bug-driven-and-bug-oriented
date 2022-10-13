import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CheckBillButton from "./CheckBillButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的CheckBillButton(不要修改Template)
export default {
  title: "CheckBillButton",
  component: CheckBillButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CheckBillButton>;

const Template: ComponentStory<typeof CheckBillButton> = (args) => (
  <CheckBillButton {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  
};