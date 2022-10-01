import { Box } from "@mui/system";
import React from "react";
import { Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无

  confirm?: boolean;
  isStaff?: boolean;
  //预留空函数
  toStaff?: (params: any) => any;
  toCustomer?: (params: any) => any;
}


export default function OrderNowButton({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  confirm = true,
  isStaff = true,
  toStaff,
  toCustomer,
  ...props
}: ListProps) {
  return (
    <>
      {isStaff && (
        <Button onClick={() => toStaff} color='warning' sx={{ width: '100%', height: 60, borderRadius: 2, fontWeight: 'bold' }}>
          I'm Staff
        </Button>
      )}
      {(!confirm && !isStaff) && (
        <Button disabled sx={{ width: '100%', background: '#EEECF6', color: '#503E9D', fontWeight: 'bold', height: 60, borderRadius: 2 }}>
          Order now<ArrowForwardIcon />
        </Button>
      )}
      {(confirm && !isStaff) && (
        <Button onClick={() => toCustomer} variant="contained" sx={{
          width: '100%', '&:hover': {
            backgroundColor: '#8475B0',
          }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 60, borderRadius: 2
        }}>
          Order now<ArrowForwardIcon />
        </Button>
      )}
    </>
  );
}