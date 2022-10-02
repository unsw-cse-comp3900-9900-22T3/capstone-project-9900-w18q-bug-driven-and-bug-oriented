import { Box } from "@mui/system";
import React, { useState } from "react";
import { Button } from "@mui/material";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  number?: string;
  selected?: boolean;
  //预留空函数
  doSomething?: (params: any) => any;

}

// 别忘了修改函数名
export default function BorderButton({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  number = '1',
  selected = false,
  doSomething,
  ...props
}: ListProps) {

  return (
    <>
      {!selected && (
        <Button disableRipple onClick={doSomething} sx={{ backgroundColor: '#F5F5F5', fontWeight: 'bold', color: '#000000', borderRadius: 2, width: 40, border: 4, borderColor: '#F5F5F5' }}>
          {number}
        </Button>
      )}
      {selected && (
        <Button disableRipple onClick={doSomething} sx={{ backgroundColor: '#F5F5F5', fontWeight: 'bold', color: '#000000', borderRadius: 2, width: 40, border: 4, borderColor: '#503E9D' }}>
          {number}
        </Button>
      )}
    </>
  );
}