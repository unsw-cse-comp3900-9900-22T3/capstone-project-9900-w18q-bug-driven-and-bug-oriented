import { Box } from "@mui/system";
import React from "react";
import { Button, Card, IconButton, Modal, Typography } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  props1?: string;
  props2?: string;
  props3?: boolean;
  //预留空函数
  doSomething: (params: any) => any;

  itemIndex?: string
  table?: string
  dishName?: string

  requestId?: string
  startTime?: Date
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

// 别忘了修改函数名
export default function WaitRequestBox({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  props1 = '',
  props2 = '',
  props3 = true,
  doSomething,

  itemIndex = '123456',
  table = '10',
  dishName = 'Pizza',

  requestId = '654321',
  ...props
}: ListProps) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleComfirm =(e: any) => {
    setOpen(false);
    doSomething(e);
  };

  const [progress, setProgress] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{backgroundColor: '#F7F7F7', width: 450, height: 170, borderRadius: 5}}>
      <Box display='flex' justifyContent='space-between' sx={{alignContent: 'center', m:1, p:2 }}>
        <Box display='flex' fontSize={20} fontWeight={'bold'} >Table {table}</Box>
        <Box display='flex' sx={{color: '#626264'}}>#{requestId}</Box>
      </Box>

      <Box display='flex' justifyContent='space-between' sx={{alignContent: 'center', mt: -1 }}>
        
        <Box display='flex'> 
          <Box display='flex' sx={{alignContent: 'center', m:1, p:1 }}> 
            <AccessTimeIcon color="disabled" fontSize="large"/> 
          </Box>
          <Box > 
            <Typography variant="h6" > 
              Waiting time
            </Typography>
            <Typography variant="h5" fontWeight='bold'>
              9 min
            </Typography>
          </Box>
        </Box>

        <Box display='flex' sx={{alignContent: 'center', m:1, p:1 }}>
        <Button variant="contained" onClick={handleOpen} sx={{
            height: 40, width: 130, backgroundColor: '#503E9D', borderRadius: 3,
            '&:hover': {
              backgroundColor: '#8475B0',
            }
          }}>
            <Typography variant="h6" >
              Finish
            </Typography>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >

            <Card sx={style}>
              <Box sx={{ display: 'flex', justifyContent: 'right', marginRight: -2 }}>
                <IconButton onClick={handleClose} color="primary" sx={{ color: '#A3A3A4' }} aria-label="upload picture" component="label">
                  <ClearIcon />
                </IconButton>
              </Box>

              <Box sx={{ justifyContent: 'center', alignContent: 'middle', display: 'flex', mt: 5, flexDirection: 'column' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2}}  >
                  Item confirm
                </Typography>
                <Typography sx={{ textAlign: 'center' }} >
                  Have you served the item?
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >
                  Table {table} {dishName}
                </Typography>
              </Box>

              <Box sx={{display:'flex', justifyContent:'center', mt:7}}>
                <Button onClick={handleComfirm} sx={{
                  width: 150, '&:hover': {
                    backgroundColor: '#8475B0',
                  }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 55, borderRadius: 3, mr:5
                }}>
                  <Typography variant="h6" sx={{ color: '#ffffff' }} >
                    Confirm
                  </Typography>
                </Button>
                <Button onClick={handleClose} sx={{
                  width: 150, '&:hover': {
                    backgroundColor: '#F1F1F1',
                  }, backgroundColor: '#F7F7F7', fontWeight: 'bold', height: 55, borderRadius: 3,
                }}>
                  <Typography variant="h6" sx={{ color: '#000000', }} >
                    cancel
                  </Typography>
                </Button>
              </Box>
            </Card>

          </Modal>    
        </Box>
      </Box>
    
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '90%', px:3, py:2}}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </ThemeProvider>
  
    </Box>

    
  );
}