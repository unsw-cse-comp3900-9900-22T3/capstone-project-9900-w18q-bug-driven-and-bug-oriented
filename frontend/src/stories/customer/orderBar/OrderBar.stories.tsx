import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import OrderBar from "./OrderBar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的OrderBar(不要修改Template)
export default {
  title: "OrderBar",
  component: OrderBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof OrderBar>;

const Template: ComponentStory<typeof OrderBar> = (args) => (
  <OrderBar {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  number: 2,
  price: 22.36,
  haveItem: true,
  canSubmit: true,
  ceilingOfCal: 1000,
  countOfCal: 500,
};