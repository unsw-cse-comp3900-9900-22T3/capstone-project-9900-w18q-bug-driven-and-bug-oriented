import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import OrderCard from "./OrderCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的OrderCard(不要修改Template)
export default {
  title: "OrderCard",
  component: OrderCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof OrderCard>;

const Template: ComponentStory<typeof OrderCard> = (args) => (
  <OrderCard {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  orderId: 123,
  table: 1,
  time: '2022-10-10-18:07:58',
  isRequest: 1,
  price: 20,
  itemList: [
    {
      dishName: 'meat',
      price: 20,
      status: 'Completed',
    },
    {
      dishName: 'vegetable',
      price: 15,
      status: 'Completed',
    },
    {
      dishName: 'drink',
      price: 4,
      status: 'Completed',
    },
    {
      dishName: 'meat',
      price: 20,
      status: 'no',
    },
    {
      dishName: 'vegetable',
      price: 15,
      status: 'Completed',
    },
    {
      dishName: 'drink',
      price: 4,
      status: 'no',
    },
    {
      dishName: 'drink',
      price: 4,
      status: 'Completed',
    },
    {
      dishName: 'meat',
      price: 20,
      status: 'no',
    },

  ]
};