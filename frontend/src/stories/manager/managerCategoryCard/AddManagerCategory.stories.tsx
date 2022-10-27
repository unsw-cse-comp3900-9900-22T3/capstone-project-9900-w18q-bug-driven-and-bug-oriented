import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AddManagerCategory from "./AddManagerCategory";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的AddManagerCategory(不要修改Template)
export default {
  title: "AddManagerCategory",
  component: AddManagerCategory,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AddManagerCategory>;

const Template: ComponentStory<typeof AddManagerCategory> = (args) => (
  <AddManagerCategory {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  props1: "111",
  props2: "222",
  props3: true,
};