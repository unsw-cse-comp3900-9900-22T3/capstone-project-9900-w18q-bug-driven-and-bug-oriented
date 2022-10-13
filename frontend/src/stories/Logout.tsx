import { Box } from "@mui/system";
import React from "react";
import { Button, Card, IconButton, Modal, Typography } from "@mui/material";
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
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  //预留空函数
  doSomething?: (params: any) => any;
  status?: string;

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
export default function Logout({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）

  doSomething,
  status,
  ...props
}: ListProps) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();


  const handleComfirm = (e: any) => {
    setOpen(false);
    navigate('/');
  };
  return (
    <>
      {status === 'logout' && (
        <>
          <Button onClick={handleOpen} variant="contained" sx={{
            height: 45, width: 250, backgroundColor: '#503E9D', borderRadius: 3, '&:hover': {
              backgroundColor: '#8475B0',
            }
          }}>
            <Box sx={{ display: 'flex', ml:-2 }}>
              <KeyboardBackspaceIcon sx={{ color: '#ffffff' }} />
              <Typography variant="inherit" sx={{ color: '#ffffff', marginLeft: 1, fontSize: 16 }}>
                Log out
              </Typography>
            </Box>
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

              <Box sx={{ justifyContent: 'center', display: 'flex', mt: 6 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }} >
                  Confirm to exit?
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7 }}>
                <Button onClick={handleComfirm} sx={{
                  width: 150, '&:hover': {
                    backgroundColor: '#8475B0',
                  }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 55, borderRadius: 3, mr: 5
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
        </>
      )}
       {status === 'back' && (
        <>
          <Button onClick={handleOpen} variant="contained" sx={{
            height: 45, width: 250, backgroundColor: '#503E9D', borderRadius: 3, '&:hover': {
              backgroundColor: '#8475B0',
            }
          }}>
            <Box sx={{ display: 'flex', ml:-2 }}>
              <KeyboardBackspaceIcon sx={{ color: '#ffffff' }} />
              <Typography variant="inherit" sx={{ color: '#ffffff', marginLeft: 1, fontSize: 16 }}>
                Back
              </Typography>
            </Box>
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

              <Box sx={{ justifyContent: 'center', display: 'flex', mt: 6 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }} >
                  Confirm to exit?
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7 }}>
                <Button onClick={handleComfirm} sx={{
                  width: 150, '&:hover': {
                    backgroundColor: '#8475B0',
                  }, backgroundColor: '#503E9D', fontWeight: 'bold', height: 55, borderRadius: 3, mr: 5
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
        </>
      )}

    </>
  );
}