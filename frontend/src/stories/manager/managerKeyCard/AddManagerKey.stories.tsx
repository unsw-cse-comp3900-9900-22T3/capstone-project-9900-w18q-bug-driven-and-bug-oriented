import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AddManagerKey from "./AddManagerKey";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的AddManagerKey(不要修改Template)
export default {
  title: "AddManagerKey",
  component: AddManagerKey,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AddManagerKey>;

const Template: ComponentStory<typeof AddManagerKey> = (args) => (
  <AddManagerKey {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {

};