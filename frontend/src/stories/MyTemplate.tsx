import { Box } from "@mui/system";
import React from "react";
import { Button } from "@mui/material";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  props1?: string;
  props2?: string;
  props3?: boolean;
  //预留空函数
  doSomething?: (params: any) => any;

}

// 别忘了修改函数名
export default function MyTemplate({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  props1 = '',
  props2 = '',
  props3 = true,
  doSomething,

  ...props
}: ListProps) {
  return (
    <>
      <Box>{props1}</Box>
      <Button>{props2}</Button>
      <div>{props3}</div>
    </>
  );
}