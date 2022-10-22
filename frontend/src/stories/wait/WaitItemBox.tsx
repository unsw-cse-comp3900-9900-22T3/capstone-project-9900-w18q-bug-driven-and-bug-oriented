import { Box } from "@mui/system";
import React from "react";
import { Button, Card, IconButton, Modal, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

// 声明变量的数据格式
interface ListProps {
  //预留空函数
  doSomething: (params: any) => any;

  itemIndex?: string
  table?: string
  dishName?: string
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
export default function WaitItemBox({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）
  doSomething,

  itemIndex = '123456',
  table = '10',
  dishName = 'Pizza',
  ...props
}: ListProps) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleComfirm =(e: any) => {
    setOpen(false);
    doSomething(e);
  };
  
  return (
    <Box sx={{backgroundColor: '#F7F7F7', width: 450, height: 170, borderRadius: 5}}>
      <Box display='flex' justifyContent='space-between' sx={{alignContent: 'center', m:1, p:2 }}>
        <Box display='flex' fontSize={20} fontWeight={'bold'} >Table {table}</Box>
        <Box display='flex' sx={{color: '#626264'}}>#{itemIndex}</Box>
      </Box>
      <Box display='flex' justifyContent='space-between' sx={{alignContent: 'center', m:1, p:2 }}>
        <Box display='flex' fontSize={24} fontWeight={'bold'} >{dishName}</Box>
        <Box display='flex'>
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

              <Box sx={{ justifyContent: 'center', alignContent: 'middle', display: 'flex', mt: 3, flexDirection: 'column' }}>
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

              <Box sx={{display:'flex', justifyContent:'center', mt:4}}>
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
    
      
    
    
    
    </Box>

    
  );
}