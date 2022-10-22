import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import OrderRecord from "./OrderRecord";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的OrderRecord(不要修改Template)
export default {
  title: "OrderRecord",
  component: OrderRecord,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof OrderRecord>;

const Template: ComponentStory<typeof OrderRecord> = (args) => (
  <OrderRecord {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  table : 1,
  orderTime : 'Thu, 20 Oct 2022 11:36:00 GMT',
  status  : 'Completed',
  waitCount  : 0,
};