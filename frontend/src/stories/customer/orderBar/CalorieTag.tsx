import { Box } from "@mui/system";
import React from "react";
import { Button, Typography } from "@mui/material";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  ceiling?: number;
  count?: number;
  //预留空函数
  doSomething?: (params: any) => any;

}

// 别忘了修改函数名
export default function CalorieTag({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  ceiling = 0,
  count = 0,
  doSomething,

  ...props
}: ListProps) {
  return (
    <>
    {Number(count) < Number(ceiling) && (
      <Box sx={{ backgroundColor: '#FFF1EC', color: '#FB6D3A', height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', width:'fit-content',borderRadius:2 }}>
        <Typography variant="body1" sx={{fontWeight:'bold', marginLeft:1.5, marginRight:1.5}} >
          Calorie Deflicit:&nbsp;{ Number(ceiling) - Number(count)}Cal
        </Typography>
      </Box>
    )}
    {Number(count) >= Number(ceiling) && (
      <Box sx={{ backgroundColor: '#FFF1EC', color: '#FB6D3A', height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', width:'fit-content',borderRadius:2 }}>
        <Typography variant="body1" sx={{fontWeight:'bold', marginLeft:1.5, marginRight:1.5}} >
          Calorie Enough
        </Typography>
      </Box>
    )}
      
    </>
  );
}