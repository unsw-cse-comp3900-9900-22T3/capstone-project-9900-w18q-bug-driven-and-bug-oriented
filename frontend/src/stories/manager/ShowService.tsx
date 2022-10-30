import { Box } from "@mui/system";
import React from "react";
import { Button, Card, Collapse, createTheme, IconButton, LinearProgress, Modal, Paper, ThemeProvider, Typography } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from "@storybook/addons";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  table?: number;
  startTime?: string;
  requestId?: string
  
  //预留空函数


}

const theme = createTheme({
  palette: {
    primary: {
      main: '#FB6D3A',
      contrastText: '#fff',
    },
  },
});

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

//进度条满时对应时间（分钟）
const waitTimeLimit = 2;

//进度条更新时间间隔（秒）
const updateInt = 3;

//仅做测试用
const dateToStr = (d: Date) => {
  let year = d.getFullYear().toString();
  let mon = (d.getMonth()+1).toString();
  if (mon.length ===1) {mon = '0' + mon;}
  let day = d.getDate().toString();
  if (day.length ===1) {day = '0' + day;}
  let hr = d.getHours().toString();
  if (hr.length ===1) {hr = '0' + hr;}
  let min = d.getMinutes().toString();
  if (min.length ===1) {min = '0' + min;}
  let sec = d.getSeconds().toString();
  if (sec.length ===1) {sec = '0' + sec;}
  return year + '-' 
       + mon + '-' 
       + day + '-' 
       + hr + ':' 
       + min + ':' 
       + sec;
}

const strToDate = (s: string) => {
  return new Date(parseInt(s.substring(0, 4)), parseInt(s.substring(5, 7))-1, parseInt(s.substring(8, 10)), parseInt(s.substring(11, 13)),
                  parseInt(s.substring(14, 16)), parseInt(s.substring(17, 19)));
}


// 别忘了修改函数名
export default function ShowService({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  table = 5,
  startTime = '',
  requestId = '222',

  ...props
}: ListProps) {


  const countProgress = () => {
    let diff = (new Date()).getTime() - strToDate(startTime).getTime();
    console.log(startTime);
    console.log(dateToStr(new Date()));
    console.log(new Date().toDateString());
    console.log(new Date().toTimeString());
    console.log(strToDate(startTime));
    console.log(diff);
    return Math.min(diff / (1000 * 60 * waitTimeLimit) * 100, 100);
  };

  const countTime = () => {
    let diff = (new Date()).getTime() - strToDate(startTime).getTime();
    return Math.trunc(diff / (1000 * 60));
  };

  const [progress, setProgress] = React.useState(countProgress());
  const [waitTime, setWaitTime] = React.useState(countTime());
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(countProgress());
      setWaitTime(countTime());
    }, updateInt);

    return () => {
      clearInterval(timer);
    };
  }, []);


  const arr_start = startTime.split('-');
  const startYMD = arr_start[2] + '/' + arr_start[1] + '/' + arr_start[0];
  const startHMS = arr_start[3];



  return (
    <>
      <Card sx={{ minHeight: 275, width: 450, backgroundColor: '#F7F7F7', borderRadius: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography sx={{ m: 2, ml: 4, fontWeight: 'bold' }} variant='h6'>
            Table {table}
          </Typography>
          <Box display='flex' sx={{color: '#626264',m:2.5, mr:4,}}>#{requestId}</Box>
        </Box>
 

        <Box sx={{ display: 'flex', flexDirection: 'row', mb:5, mt:2 }}>
          <Typography sx={{ ml: 4, color: '#626264' }} variant='subtitle1'>
            <CalendarTodayIcon sx={{ mr: 0.5, mb: -0.5 }} />{startYMD}
          </Typography>
          <Typography sx={{ ml: 5, color: '#626264' }} variant='subtitle1'>
            <AccessTimeIcon sx={{ mr: 0.5, mb: -0.7 }} />{startHMS}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between' sx={{alignContent: 'center', mt: -1 }}>
        
        <Box display='flex'> 

          <Box sx={{ml:4}} > 
            <Typography variant="h6" > 
              Waiting time
            </Typography>
            <Typography variant="h5" fontWeight='bold'>
              {waitTime} min
            </Typography>
          </Box>
        </Box>

      </Box>
    
      <ThemeProvider theme={theme}>
        {progress !== 100 && (
        <Box sx={{ width: '90%', px:3, py:2}}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>)}
        {progress === 100 && (
        <Box sx={{ width: '90%', px:3, py:2}}>
          <LinearProgress variant="determinate" color='error' value={progress} />
        </Box>)}
      </ThemeProvider>
        
                 
      </Card>
    </>
  );
}