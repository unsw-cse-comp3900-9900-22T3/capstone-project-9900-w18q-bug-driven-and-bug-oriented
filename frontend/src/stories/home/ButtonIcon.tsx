import { Box } from "@mui/system";
import React from "react";
import { Button } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import KeyIcon from '@mui/icons-material/Key';
// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  name?: string;

}

// 别忘了修改函数名
export default function ButtonIcon({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  name = '',
  ...props
}: ListProps) {
  return (
    <>
      {name === 'table' && (<Box sx={{ display: 'flex', backgroundColor: '#EEECF6', fontWeight: 'bold', color: '#503E9D', width: 60, height: 60, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
        <RestaurantIcon sx={{ width: 30, height: 30 }} />
      </Box>)}
      {name === 'diner' && (<Box sx={{ display: 'flex', backgroundColor: '#EEECF6', fontWeight: 'bold', color: '#503E9D', width: 60, height: 60, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
        <PermIdentityIcon sx={{ width: 35, height: 35 }} />
      </Box>)}
      {name === 'key' && (<Box sx={{ display: 'flex', backgroundColor: '#EEECF6', fontWeight: 'bold', color: '#503E9D', width: 60, height: 60, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
        <KeyIcon sx={{ width: 35, height: 35 }} />
      </Box>)}
    </>
  );
}