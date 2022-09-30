import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MyTemplate from "./MyTemplate";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的MyTemplate(不要修改Template)
export default {
  title: "MyTemplate",
  component: MyTemplate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof MyTemplate>;

const Template: ComponentStory<typeof MyTemplate> = (args) => (
  <MyTemplate {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  props1: "111",
  props2: "222",
  props3: true,
};