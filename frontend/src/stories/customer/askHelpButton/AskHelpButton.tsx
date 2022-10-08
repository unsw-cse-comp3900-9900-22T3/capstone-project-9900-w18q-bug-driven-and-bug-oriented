import * as React from 'react';
import { Button, Snackbar, Alert } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


// 声明变量的数据格式
interface ListProps {
  //预留空函数
  doSomething?: (params: any) => any;
  ifClick?: boolean;
  lastClickTime?: Date;
}

export default function Template({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  doSomething,
  ...props
}: ListProps) {
  
  const [openInitWin, setOpenInitWin] = React.useState(false);
  const [openNoticeWin, setOpenNoticeWin] = React.useState(false);

  const [lastClickTime, setTime] = React.useState(0);
  

  const handleClick = () => {
    setOpenInitWin(false);
    setOpenNoticeWin(false);

    var nowTime = new Date();

    if (lastClickTime === 0) {
      setTime(nowTime.getTime());
      setOpenInitWin(true);
      return;
    }

    if ( nowTime.getTime() - lastClickTime > 30 * 1000 ) {
      setTime(nowTime.getTime());
      setOpenInitWin(true);
      return;
    }
    else {
      setOpenNoticeWin(true);
      return;
    }
  };

  const handleCloseInitWin = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenInitWin(false);
  };

  const handleCloseNoticeWin = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNoticeWin(false);
  };
  
  
  return (
    <>
      <Button 
        sx={{ borderRadius: 3 }}
        variant="contained"
        color="warning"
        startIcon={<HelpOutlineIcon />}
        size="large"
        onClick={handleClick}
        >
        Ask for help
      </Button>
      
      <Snackbar open={openInitWin} autoHideDuration={5000} onClose={handleCloseInitWin}>
        <Alert onClose={handleCloseInitWin} severity="success" sx={{ width: '100%'}}>
          Thanks for waiting! Waiter will come soon.
        </Alert>
      </Snackbar>

      <Snackbar open={openNoticeWin} autoHideDuration={5000} onClose={handleCloseNoticeWin}>
        <Alert onClose={handleCloseNoticeWin} severity="info" sx={{ width: '100%'}}>
          Waiter is coming!
        </Alert>
      </Snackbar>

    </>
  );
}