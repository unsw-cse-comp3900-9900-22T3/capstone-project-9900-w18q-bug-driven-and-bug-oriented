import { Box } from "@mui/system";
import React from "react";
import { Button, Typography } from "@mui/material";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  role?: string;
  selected?: boolean;
  //预留空函数
  doSomething?: (params: any) => any;

}

// 别忘了修改函数名
export default function StaffSelectButton({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  role = '',
  selected = false,
  doSomething,

  ...props
}: ListProps) {
  return (
    <>
      {!selected && (
        <Button disableRipple onClick={doSomething} sx={{ backgroundColor: '#EEECF6', fontWeight: 'bold', color: '#503E9D', borderRadius: 2, width: 320, border: 4, borderColor: '#EEECF6' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {role}
          </Typography>
        </Button>
      )}
      {selected && (
        <Button disableRipple onClick={doSomething} sx={{ backgroundColor: '#EEECF6', fontWeight: 'bold', color: '#503E9D', borderRadius: 2, width: 320, border: 4, borderColor: '#503E9D' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {role}
          </Typography>
        </Button>
      )}
    </>
  );
}