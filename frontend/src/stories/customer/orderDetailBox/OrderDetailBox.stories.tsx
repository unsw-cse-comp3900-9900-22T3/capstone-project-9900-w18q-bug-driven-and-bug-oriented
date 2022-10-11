import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import OrderDetailBox from "./OrderDetailBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的OrderDetailBox(不要修改Template)
export default {
  title: "OrderDetailBox",
  component: OrderDetailBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof OrderDetailBox>;

const Template: ComponentStory<typeof OrderDetailBox> = (args) => (
  <OrderDetailBox {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  props1: "111",
  props2: "222",
  props3: true,
  dishName: 'Chicken Grill',
  description: 'It is one of the mot iconic and well-recognized fast food out there.',
  ingredients: 'Meat, vegetable',
  calories: '20',
  price: '16.66',
  picture: '/dishImg/chickenGrill.jpg',
  initDishNum: 0,
};