import { Box } from "@mui/system";
import React from "react";
import { Button } from "@mui/material";

import HelpIcon from '@mui/icons-material/Help';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// 声明变量的数据格式
interface ListProps {
  //预留空函数
  doSomething?: (params: any) => any;
}


export default function Template({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  doSomething,
  ...props
}: ListProps) {
  return (
    <>
      <Button 
        variant="contained"
        color="warning"
        startIcon={<HelpOutlineIcon />}
        size="large"
        onClick={() => {
          alert('Thanks for waiting! Waiter will come soon.');
        }}>
        Ask for help
      </Button>
    </>
  );
}