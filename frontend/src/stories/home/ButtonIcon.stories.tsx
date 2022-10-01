import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ButtonIcon from "./ButtonIcon";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的ButtonIcon(不要修改Template)
export default {
  title: "ButtonIcon",
  component: ButtonIcon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ButtonIcon>;

const Template: ComponentStory<typeof ButtonIcon> = (args) => (
  <ButtonIcon {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  name: "table",
};