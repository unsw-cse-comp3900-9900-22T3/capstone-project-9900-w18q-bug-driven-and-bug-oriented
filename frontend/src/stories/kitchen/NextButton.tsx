import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  type?: string;

  //预留空函数
  doSomething?: (params: any) => any;
}

// 别忘了修改函数名
export default function NextButton({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  type = '1',
  doSomething,
  ...props
}: ListProps) {

  return (
    <>
      {type === '0' && (
        <Button variant="contained"
          sx={{
            height: 55,
            width: 115,
            backgroundColor: '#503E9D',
            '&:hover': {
              backgroundColor: '#7365B1',
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2
          }}
          endIcon={<KeyboardDoubleArrowRightIcon />}
          onClick={doSomething}
        >
          <Typography variant="subtitle1">
            Next
          </Typography>
        </Button>
      )}
      
      {type === '1' && (
        <Button variant="contained"
          sx={{
            height: 55,
            width: 115,
            backgroundColor: '#EEECF6',
            '&:hover': {
              backgroundColor: '#7365B1',
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2
          }}
          endIcon={<KeyboardDoubleArrowRightIcon />}
          onClick={doSomething}
        >
          <Typography variant="subtitle1">
            Next
          </Typography>
        </Button>
      )}

    </>
  );
}