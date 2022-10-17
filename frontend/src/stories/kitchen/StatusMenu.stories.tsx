import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StatusMenu from "./StatusMenu";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的MyTemplate(不要修改Template)
export default {
  title: "StatusMenu",
  component: StatusMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof StatusMenu>;

const Template: ComponentStory<typeof StatusMenu> = (args) => (
  <StatusMenu {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  props1: "111",
  props2: "222",
  props3: true,
};