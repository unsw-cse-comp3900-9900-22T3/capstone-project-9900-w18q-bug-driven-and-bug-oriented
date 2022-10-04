import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CalorieTag from "./CalorieTag";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的CalorieTag(不要修改Template)
export default {
  title: "CalorieTag",
  component: CalorieTag,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CalorieTag>;

const Template: ComponentStory<typeof CalorieTag> = (args) => (
  <CalorieTag {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  ceiling: 1000,
  count: 500,

};