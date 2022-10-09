import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Logout from "./Logout";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的MyTemplate(不要修改Template)
export default {
  title: "Logout",
  component: Logout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Logout>;

const Template: ComponentStory<typeof Logout> = (args) => (
  <Logout {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  name: "logout",
  selected: false,
  item: 'logout',
};