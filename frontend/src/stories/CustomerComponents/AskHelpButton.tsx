import { Box } from "@mui/system";
import * as React from 'react';
import { Button, Snackbar, Alert } from "@mui/material";

import HelpIcon from '@mui/icons-material/Help';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// 声明变量的数据格式
interface ListProps {
  //预留空函数
  doSomething?: (params: any) => any;
}

export default function Template({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  doSomething,
  ...props
}: ListProps) {
  
  const [open, setOpen] = React.useState(false);
  
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
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
      
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%'}}>
          Thanks for waiting! Waiter will come soon.
        </Alert>
      </Snackbar>

    </>
  );
}