import { Box } from "@mui/system";
import React from "react";
import { Button, Card, Collapse, IconButton, Modal, Paper, Typography } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from "@storybook/addons";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  table?: number;
  startTime?: string;
  endTime?: string;
  isRequest?: number;
  
  //预留空函数
  confirmFunc: (params: any) => any;

}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 280,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  pt: 2,
};


// 别忘了修改函数名
export default function ShowService({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  table = 5,
  startTime = '',
  endTime = '',
  isRequest = 1,
  confirmFunc,

  ...props
}: ListProps) {

  const [open, setOpen] = React.useState(false);
  // const [day, setDay] = React.useState('');
  // const [t, setT] = React.useState('');



  // useEffect(() => {

  // }, [])

  const arr_start = startTime.split('-');
  const startYMD = arr_start[2] + '/' + arr_start[1] + '/' + arr_start[0];
  const startHMS = arr_start[3];
  const arr_end = endTime.split('-');
  const endYMD = arr_end[2] + '/' + arr_end[1] + '/' + arr_end[0];
  const endHMS = arr_end[3];


  return (
    <>
      <Card sx={{ minHeight: 275, width: 450, backgroundColor: '#F7F7F7', borderRadius: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography sx={{ m: 2, ml: 4, fontWeight: 'bold' }} variant='h6'>
            Table {table}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography sx={{ m: 2, ml: 4, fontWeight: 'bold' }} variant='h6'>
            Start Time:
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
          <Typography sx={{ ml: 4, color: '#626264' }} variant='subtitle1'>
            <CalendarTodayIcon sx={{ mr: 0.5, mb: -0.5 }} />{startYMD}
          </Typography>
          <Typography sx={{ ml: 5, color: '#626264' }} variant='subtitle1'>
            <AccessTimeIcon sx={{ mr: 0.5, mb: -0.7 }} />{startHMS}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography sx={{ m: 2, ml: 4, fontWeight: 'bold' }} variant='h6'>
            End Time:
          </Typography>
        </Box>

        {isRequest === 0 && (
            <Typography sx={{ ml: 5, color: '#626264' }} variant='subtitle1'>
            In Progress
          </Typography>
          )}
          
        {isRequest === 1 && (
        <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
          <Typography sx={{ ml: 4, color: '#626264' }} variant='subtitle1'>
            <CalendarTodayIcon sx={{ mr: 0.5, mb: -0.5 }} />{endYMD}
          </Typography>
          <Typography sx={{ ml: 5, color: '#626264' }} variant='subtitle1'>
            <AccessTimeIcon sx={{ mr: 0.5, mb: -0.7 }} />{endHMS}
          </Typography>
        </Box>
        )}
        
      </Card>
    </>
  );
}