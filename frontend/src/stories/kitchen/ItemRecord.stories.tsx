import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ItemRecord from "./ItemRecord";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//修改所有的ItemRecord(不要修改Template)
export default {
  title: "ItemRecord",
  component: ItemRecord,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ItemRecord>;

const Template: ComponentStory<typeof ItemRecord> = (args) => (
  <ItemRecord {...args} />
);

export const Test = Template.bind({});
// 参数,storybook里的默认参数
Test.args = {
  itemCategory : 'Broiled Food',
  itemName : 'Chicken Grill',
  status  : 'Prepared',
};