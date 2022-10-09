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
  name?: string;
  selected?: boolean;
  item?: string;

  //预留空函数
  doSomething?: (params: any) => any;

}

// 别忘了修改函数名
export default function Logout({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  name = '',
  selected = false,
  item = '',
  doSomething,

  ...props
}: ListProps) {
  return (
    <>
      {(item === 'logout' && !selected) && (
        <Box sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', backgroundColor: '#503E9D', borderRadius: 3, alignItems: 'center',
          '&:hover': {

            cursor: 'pointer'
          },
        }}>
          <KeyboardBackspaceIcon sx={{ color: '#ffffff', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#ffffff', margin: 0.5, marginLeft: 2 }}>
          Log out
          </Typography>
        </Box>
      )}
      {(item === 'logout' && selected) && (
        <Box onClick={doSomething} sx={{
          width: 270, height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: 3
          , '&:hover': {
            backgroundColor: '#F6F9FC',
            cursor: 'pointer'
          }
        }}>
          <KeyboardBackspaceIcon sx={{ color: '#626264', height: 40, width: 40, marginLeft: 2 }} />
          <Typography variant="h6" sx={{ color: '#626264', margin: 0.5, marginLeft: 2 }}>
            Log out
          </Typography>
        </Box>
      )}
    </>
  );
}