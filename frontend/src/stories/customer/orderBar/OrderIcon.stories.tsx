import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import OrderIcon from "./OrderIcon";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的OrderIcon(不要修改Template)
export default {
  title: "OrderIcon",
  component: OrderIcon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof OrderIcon>;

const Template: ComponentStory<typeof OrderIcon> = (args) => (
  <OrderIcon {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  number: 1,
  shown: true,
};