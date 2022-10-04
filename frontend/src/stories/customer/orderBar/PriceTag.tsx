import { Box } from "@mui/system";
import React from "react";
import { Button, Typography } from "@mui/material";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  price?: number;
  //预留空函数
  doSomething?: (params: any) => any;

}

// 别忘了修改函数名
export default function PriceTag({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  price = 0,
  doSomething,

  ...props
}: ListProps) {
  return (

      <Box sx={{display:'flex', flexDirection:'row'}}>
        <Typography variant="h4" sx={{marginTop:2.5}} >
          $
        </Typography>
        <Typography variant="h2"  >
          {price}
        </Typography>
      </Box>

  );
}