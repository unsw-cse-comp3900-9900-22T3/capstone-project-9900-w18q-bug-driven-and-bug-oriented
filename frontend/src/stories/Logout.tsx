import { Box } from "@mui/system";
import React from "react";
import { Button, Typography } from "@mui/material";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ChatIcon from '@mui/icons-material/Chat';
import KeyIcon from '@mui/icons-material/Key';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  //预留空函数
  doSomething?: (params: any) => any;

}

// 别忘了修改函数名
export default function Logout({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）

  doSomething,
  ...props
}: ListProps) {
  return (
    <>
      <Button onClick={doSomething} variant="contained" sx={{
        height: 45, width: 200, backgroundColor: '#503E9D', borderRadius: 3, '&:hover': {
          backgroundColor: '#8475B0',
        }
      }}>
        <Box sx={{ display: 'flex' }}>
          <KeyboardBackspaceIcon sx={{ color: '#ffffff' }} />
          <Typography variant="inherit" sx={{ color: '#ffffff', marginLeft: 2, fontSize: 16 }}>
            Log out
          </Typography>
        </Box>

      </Button>
    </>
  );
}