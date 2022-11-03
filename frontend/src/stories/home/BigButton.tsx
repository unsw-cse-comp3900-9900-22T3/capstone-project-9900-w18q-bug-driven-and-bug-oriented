import { Box } from "@mui/system";
import React from "react";
import { Button, Typography } from "@mui/material";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  name?: string;
  confirm?: boolean;
  //预留空函数
  doSomething?: (params: any) => any;

}

// 别忘了修改函数名
export default function BigButton({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  name = '',
  confirm = true,
  doSomething,

  ...props
}: ListProps) {
  return (
    <>
      {!confirm && (
        <Button disabled sx={{ width: '100%', background: '#EEECF6', color: '#503E9D', fontWeight: 'bold', height: 60, borderRadius: 2 }}>
          <Typography sx={{fontWeight: 'bold'}}>
           {name} 
          </Typography>
          
        </Button>
      )}
      {confirm && (
        <Button onClick={doSomething} variant="contained" sx={{
          width: '100%', '&:hover': {
            backgroundColor: '#8475B0',
          }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 60, borderRadius: 2
        }}>
          <Typography variant="subtitle1" sx={{  }}>
            {name}
          </Typography>
        </Button>
      )}

    </>
  );
}