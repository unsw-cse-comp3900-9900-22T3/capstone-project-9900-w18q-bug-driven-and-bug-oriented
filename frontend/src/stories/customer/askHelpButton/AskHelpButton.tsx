import * as React from 'react';
import { Button, Snackbar, Alert } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// 声明变量的数据格式
interface ListProps {
  //预留空函数
  doSomething: (params: any) => any;
}

const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export default function Template({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  doSomething = () => {},
  ...props
}: ListProps) {

  const [openInitWin, setOpenInitWin] = React.useState(false);
  const [openNoticeWin, setOpenNoticeWin] = React.useState(false);

  const [lastClickTime, setTime] = React.useState(0);

  const [askTimer, setAskTimer] = React.useState(0);

  const handleClick = (e: any) => {
    setOpenInitWin(false);
    setOpenNoticeWin(false);

    var nowTime = new Date();

    if (lastClickTime === 0) {
      setTime(nowTime.getTime());
      setOpenInitWin(true);
      setAskTimer(30);
      doSomething(e);
      return;
    }

    if (nowTime.getTime() - lastClickTime > 30 * 1000) {
      setTime(nowTime.getTime());
      setOpenInitWin(true);
      setAskTimer(30);
      doSomething(e);
      return;
    }
    else {
      setOpenNoticeWin(true);
      return;
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      var diffTime = new Date().getTime() - lastClickTime;
      if (diffTime < 30 * 1000){setAskTimer(30 - Math.trunc(diffTime / 1000))}
      else {setAskTimer(0)}
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [lastClickTime]);

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
      {askTimer === 0 && <Button
        sx={{ borderRadius: 3, width: 250 }}
        variant="contained"
        color="warning"
        startIcon={<HelpOutlineIcon />}
        size="large"
        onClick={handleClick}
      >
        Ask for help
      </Button>}

      {askTimer !== 0 && <ThemeProvider theme={theme}><Button
        sx={{ borderRadius: 3, width: 250 }}
        variant="contained"
        color="neutral"
        startIcon={<HelpOutlineIcon />}
        size="large"
        onClick={handleClick}
      >
        Ask for help ({askTimer})
      </Button></ThemeProvider>}

      <Snackbar open={openInitWin}
        autoHideDuration={5000}
        onClose={handleCloseInitWin}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseInitWin}
          severity="success"
          sx={{
            width: '100%'
          }}
        >
          Thanks for waiting! Waiter will come soon.
        </Alert>
      </Snackbar>

      <Snackbar open={openNoticeWin}
        autoHideDuration={5000}
        onClose={handleCloseNoticeWin}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNoticeWin} severity="info" sx={{ width: '100%' }}>
          Waiter is coming, please wait.
        </Alert>
      </Snackbar>

    </>
  );
}