import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Button, Card, Paper, Typography, IconButton, Modal } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import { KeyObject } from "crypto";

// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无
  role?: string;
  name?: string;
  keyValue?: string;
  lastModified?: string;
  //预留空函数
  deleteFunc?: (params: any) => any;
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
export default function ManagerKeyCard({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  role = 'Manager',
  name = 'Tony',
  keyValue = '',
  lastModified = '2022-09-24 19:07:33',
  deleteFunc = () =>{},

  ...props
}: ListProps) {

  const [open, setOpen] = useState(false);
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleComfirm =(e: any) => {
    setOpen(false);
    deleteFunc(e);
  };

  return (
    <>
        <Paper elevation={0}  
          sx={{
            width: '100%', height: 182, display: 'flex', bgcolor: '#F7F7F7', borderRadius: 5, flexDirection: 'column', 
            
        }}>
          
          <Box display='flex' justifyContent='space-between'>
          <Box>
            <Box display='flex' flexDirection='row'>
              <Box>
                <Box sx={{ ml: 5, mt: 5}}>
                  <Typography sx={{fontWeight: 'bold' }} variant="h5">
                    Role: {role}
                  </Typography>
                  <Typography sx={{fontWeight: 'bold' }} variant="h5">
                    Name: {name}
                  </Typography>
                </Box>
                <Box sx={{ m: 5, mt: 1, flexDirection: 'row', display: 'flex' }}>
                <Typography sx={{ fontWeight: 'bold' }} variant="h5">
                  Key: {keyValue}
                </Typography>                  
                </Box>
              </Box>
              <Box>

              </Box>
            </Box>
          </Box>

          <Box sx={{ mr: 5, mt: 8}}>
            <Button onClick={handleOpen} variant="contained" sx={{
              height: 50, width: 100, backgroundColor: '#503E9D', borderRadius: 3, '&:hover': {
                backgroundColor: '#8475B0',
              }
            }}>
              <Box sx={{ display: 'flex'}}>
                <Typography variant="inherit" sx={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold'}}>
                  Delete
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

              <Box sx={{ justifyContent: 'center', alignContent: 'middle', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2}}  >
                  Delete confirm
                </Typography>
                <Typography sx={{ fontSize: 20, textAlign: 'center' }} >
                  Do you want to delete this key?
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >
                  Role: {role}
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >
                  Name: {name}
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >
                  Key: {keyValue}
                </Typography>
              </Box>

              <Box sx={{display:'flex', justifyContent:'center', mt:2}}>
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
              
        </Paper>
    </>
  );
}