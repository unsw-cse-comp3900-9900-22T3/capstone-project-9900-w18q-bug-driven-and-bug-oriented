import { Box } from "@mui/system";
import React from "react";
import { Backdrop, Button, Card, Fade, IconButton, Modal, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import WalletIcon from '@mui/icons-material/Wallet';
// 声明变量的数据格式
interface ListProps {
  //问号是说可有可无

  //预留空函数
  doSomething: (params: any) => any;

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
export default function CheckBillButton({
  // 参数，内容影响不大可以没有（如果return要用的话，必须声明）

  doSomething,
  ...props
}: ListProps) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleComfirm = (e: any) => {
    setOpen(false);
    doSomething(e);
  };

  return (
    <>
      <Button variant="contained" color="warning" onClick={handleOpen} sx={{
        height: 35, width: 95, borderRadius: 3,
      }}>
        <Box  sx={{ display: 'flex', flexDirection: 'row' }}>
          <WalletIcon />
          <Typography variant="subtitle2" sx={{ display: 'flex', flexDirection: 'row', ml:0.5,mt:0.2 }}>
            Check
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
              Confirm to Check?
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
                Cancel
              </Typography>
            </Button>
          </Box>
        </Card>

      </Modal>




    </>
  );
}